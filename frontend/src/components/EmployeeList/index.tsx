import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import AspectRatio from "../AspectRatio";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/toastOptions";
import { AiFillCheckCircle } from "react-icons/ai";

const fetchEmployees = (): Promise<EmployeeResponse> =>
  axiosInstance.get("/employee");

const updateStatus = (id: string): Promise<SimpleResponse> =>
  axiosInstance.put(`/employee/${id}/status`);

export default function EmployeeTable() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });
  const { mutateAsync } = useMutation({
    mutationFn: updateStatus,
  });

  if (isLoading) return null;

  const handleConfirm = (id: string) => {
    mutateAsync(id, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message, toastOptions);
          queryClient.invalidateQueries(["employees"]);
        }
      },
    });
  };

  return (
    <div className="p-3 grid grid-cols-2 gap-6">
      {data?.employees.map((employee) => (
        <div
          key={employee._id}
          className="p-3 rounded-md bg-white flex gap-3 items-center"
        >
          <AspectRatio
            ratio={1 / 1}
            customStyles="w-12 rounded-full overflow-hidden"
          >
            <img src={employee.image} alt="profile  image" />
          </AspectRatio>
          <div className="flex-1">
            <p className="text-lg font-medium">{employee.name}</p>
            <p className="text-base text-gray-500">{employee.email}</p>
          </div>
          <div>
            {employee.status ? (
              <AiFillCheckCircle className="w-7 h-7 text-green-500" />
            ) : (
              <button
                className="text-sm p-2 bg-orange-100 text-orange-500 rounded-md"
                onClick={() => handleConfirm(employee._id)}
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
