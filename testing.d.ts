import "@testing-library/jest-dom";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string): R;
      toHaveValue(value: string | number | string[]): R;
      toHaveStyle(style: Record<string, any>): R;
      toHaveClass(className: string): R;
      toBeVisible(): R;
      toBeDisabled(): R;
    }
  }
}
