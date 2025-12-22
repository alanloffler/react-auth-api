// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { describe, it, expect, vi, beforeEach } from "vitest";
// import { LoginForm } from "@login/components/LoginForm";
//
// // =======================
// // ✅ MOCKS SIN HOISTING ISSUES
// // =======================
//
// // MOCK react-router
// vi.mock("react-router", async () => {
//   const actual = await vi.importActual<any>("react-router");
//   return {
//     ...actual,
//     useNavigate: () => vi.fn(),
//   };
// });
//
// // MOCK sonner toast
// vi.mock("sonner", () => ({
//   toast: {
//     success: vi.fn(),
//     error: vi.fn(),
//   },
// }));
//
// // MOCK Zustand store
// vi.mock("@core/auth/auth.store", () => ({
//   useAuthStore: {
//     getState: () => ({
//       setAdmin: vi.fn(),
//     }),
//   },
// }));
//
// // MOCK AuthService
// vi.mock("@core/auth/auth.service", () => ({
//   AuthService: {
//     signIn: vi.fn(),
//     getAdmin: vi.fn(),
//   },
// }));
//
// // =======================
// // ✅ IMPORT MOCKED MODULES
// // =======================
//
// import { useNavigate } from "react-router";
// import { toast } from "sonner";
// import { AuthService } from "@core/auth/auth.service";
// import { useAuthStore } from "@core/auth/auth.store";
//
// // =======================
// // ✅ CONVERT FUNCTIONS TO TYPED MOCKS
// // =======================
//
// const navigateMock = vi.mocked(useNavigate());
// const successMock = vi.mocked(toast.success);
// const errorMock = vi.mocked(toast.error);
// const mockSignIn = vi.mocked(AuthService.signIn);
// const mockGetAdmin = vi.mocked(AuthService.getAdmin);
// const setAdminMock = vi.mocked(useAuthStore.getState().setAdmin);
//
// // =======================
//
// describe("LoginForm", () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });
//
//   it("logs in successfully and redirects", async () => {
//     mockSignIn.mockResolvedValueOnce({
//       statusCode: 200,
//       data: { id: "1", email: "alanmatiasloffler@gmail.com", role: "superadmin" },
//       message: "Login exitoso",
//     });
//
//     mockGetAdmin.mockResolvedValueOnce({
//       statusCode: 200,
//       data: {
//         id: "af65c900",
//         email: "alanmatiasloffler@gmail.com",
//       },
//       message: "Administrador encontrado",
//     });
//
//     render(<LoginForm />);
//
//     fireEvent.change(screen.getByLabelText(/email/i), {
//       target: { value: "alanmatiasloffler@gmail.com" },
//     });
//
//     fireEvent.change(screen.getByLabelText(/contraseña/i), {
//       target: { value: "admin123" },
//     });
//
//     fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));
//
//     await waitFor(() => {
//       expect(mockSignIn).toHaveBeenCalledWith({
//         email: "alanmatiasloffler@gmail.com",
//         password: "admin123",
//       });
//
//       expect(mockGetAdmin).toHaveBeenCalled();
//       expect(setAdminMock).toHaveBeenCalled();
//
//       expect(successMock).toHaveBeenCalledWith("Bienvenido alanmatiasloffler@gmail.com");
//       expect(navigateMock).toHaveBeenCalledWith("/dashboard");
//     });
//   });
//
//   // it("shows error toast if login fails", async () => {
//   //   mockSignIn.mockRejectedValueOnce({
//   //     isAxiosError: true,
//   //     response: {
//   //       data: { message: "Error desconocido en el servidor" },
//   //     },
//   //   });
//
//   //   render(<LoginForm />);
//
//   //   fireEvent.change(screen.getByLabelText(/email/i), {
//   //     target: { value: "alanmatiasloffler@gmail.com" },
//   //   });
//
//   //   fireEvent.change(screen.getByLabelText(/contraseña/i), {
//   //     target: { value: "wrongpass" },
//   //   });
//
//   //   fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));
//
//   //   await waitFor(() => {
//   //     expect(errorMock).toHaveBeenCalledWith({
//   //       message: "Request failed with status code 401",
//   //       name: "AxiosError",
//   //       stack:
//   //         "AxiosError: Request failed with status code 401\n    at settle (http://localhost:5173/node_modules/.vite/deps/axios.js?v=1212c0dc:1257:12)\n    at XMLHttpRequest.onloadend (http://localhost:5173/node_modules/.vite/deps/axios.js?v=1212c0dc:1606:7)\n    at Axios.request (http://localhost:5173/node_modules/.vite/deps/axios.js?v=1212c0dc:2223:41)\n    at async AuthModuleService.signIn (http://localhost:5173/src/core/auth/auth.service.ts:11:22)\n    at async onSubmit (http://localhost:5173/src/features/login/components/LoginForm.tsx:31:24)\n    at async http://localhost:5173/node_modules/.vite/deps/chunk-NXXQW4JJ.js?v=1212c0dc:1562:9",
//   //       config: {
//   //         transitional: {
//   //           silentJSONParsing: true,
//   //           forcedJSONParsing: true,
//   //           clarifyTimeoutError: false,
//   //         },
//   //         adapter: ["xhr", "http", "fetch"],
//   //         transformRequest: [null],
//   //         transformResponse: [null],
//   //         timeout: 10000,
//   //         xsrfCookieName: "XSRF-TOKEN",
//   //         xsrfHeaderName: "X-XSRF-TOKEN",
//   //         maxContentLength: -1,
//   //         maxBodyLength: -1,
//   //         env: {},
//   //         headers: {
//   //           Accept: "application/json, text/plain, */*",
//   //           "Content-Type": "application/json",
//   //         },
//   //         baseURL: "http://localhost:3000",
//   //         withCredentials: true,
//   //         method: "post",
//   //         url: "/auth/signIn",
//   //         data: '{"email":"alanmatiasloffler@gmail.com","password":"admin123s"}',
//   //         allowAbsoluteUrls: true,
//   //       },
//   //       code: "ERR_BAD_REQUEST",
//   //       status: 401,
//   //     });
//   //     expect(navigateMock).not.toHaveBeenCalled();
//   //   });
//   // });
//
//   // it("shows fallback toast if error has no message", async () => {
//   //   mockSignIn.mockRejectedValueOnce({});
//
//   //   render(<LoginForm />);
//
//   //   fireEvent.change(screen.getByLabelText(/email/i), {
//   //     target: { value: "alanmatiasloffler@gmail.com" },
//   //   });
//
//   //   fireEvent.change(screen.getByLabelText(/contraseña/i), {
//   //     target: { value: "admin123" },
//   //   });
//
//   //   fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));
//
//   //   await waitFor(() => {
//   //     expect(errorMock).toHaveBeenCalledWith("Error desconocido en el servidor");
//   //   });
//   // });
// });
