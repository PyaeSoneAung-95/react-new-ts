import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import AspectRatio from "../AspectRatio";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/toastOptions";
import { AiFillCheckCircle } from "react-icons/ai";
import EmployeeSkeleton from "../Skeleton/EmployeesSkeleton";

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

  if (isLoading) return <EmployeeSkeleton />;

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
    <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {data?.employees.map((employee) => (
        <div
          key={employee._id}
          className="p-3 rounded-md bg-gray-100 md:bg-white flex gap-3 items-center h-fit"
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
            <ul className="mt-2">
              {employee.phone_numbers &&
                employee.phone_numbers.map((phone_number, index) => (
                  <li key={index} className="inline-block text-blue-500">
                    {phone_number}
                    {employee.phone_numbers.length !== index + 1 ? (
                      <span className="mr-2">,</span>
                    ) : null}
                  </li>
                ))}
            </ul>
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
