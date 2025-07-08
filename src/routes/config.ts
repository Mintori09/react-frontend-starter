import type { ReactNode } from 'react';

// Định nghĩa kiểu dữ liệu RouteType để cấu hình routing trong ứng dụng React
export type RouteType = {
  element: ReactNode;
  // Thành phần (component) sẽ được hiển thị khi truy cập route này, thường là một trang (Page)
  state: string;
  // Tên định danh (ID) cho route, thường dùng nội bộ để quản lý trạng thái hoặc điều hướng
  index?: boolean;
  // Nếu true, route này là "index route" (route mặc định) cho một tập hợp child routes
  path?: string;
  // Đường dẫn URL cho route này, ví dụ "/dashboard", "/login"
  child?: RouteType[];
  // Danh sách các route con (sub-routes), dùng để lồng (nested routes), ví dụ: /dashboard/analytics
  props?: {
    displayText: string;
    // Nội dung văn bản hiển thị trong sidebar hoặc menu
    icon?: ReactNode;
    // Icon hiển thị kèm với văn bản trong sidebar (nếu có)
  };
  protected?: boolean;
  // Nếu true, đây là một route yêu cầu xác thực đăng nhập (private/protected route)
  allowedRoles?: string[];
  // Danh sách các vai trò (roles) được phép truy cập route này, ví dụ ["admin", "editor"]
};
