type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  image: string;
  status: boolean;
  phone_numbers: string[];
};

type UploadProfileResponse={
  success: boolean;
  data: User,
  message: string;
}

type AuthContext = {
  user: User | null;
  updateUser: (data: User | null) => void;
};

type AuthTagHandler = {
  handleTag: (name: string) => void;
};

type Login = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  message: string;
  user: User | null;
};
type Signup = {
  name: string;
  email: string;
  password: string;
};

type SignupResonse = {
  success: boolean;
  message: string;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  containerStyles?: string;
  children: React.ReactNode;
};

type InputProps = {
  name: string;
  label: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">;

type SEOProps = {
  title: string;
};

type AspectRatioProps = {
  ratio?: number;
  children: React.ReactNode;
  customStyles?: string;
};

type News = {
  image: File | string;
  title: string;
  date: Date;
  category: string;
  content: string;
};

type CreateNewsResponse = {
  success: boolean;
  message: string;
};

type NewsResponse = {
  _id: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
  image: string;
} & Omit<News, "image">;

type NewsGroupByCategory = {
  category: string;
  list: NewsResponse[];
};

type NewsGroupByCategoryResponse = {
  news: NewsGroupByCategory[];
};

type NewsDetailResponse = {
  news: NewsResponse;
};

type NewsByCategory = {
  news: NewsResponse[];
};

type CategoryOption = {
  value: string;
  label: string;
};

type CustomHeaderProps = {
  date: Date;
  changeYear: (value: string) => void;
  changeMonth: (value: number) => void;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
};

type EmployeeFormResponse = {
  success: boolean;
  message: string;
  data: User
}

type DeleteNewsResponse={
  success: boolean;
  message: string;
}