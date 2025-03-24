import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders footer with correct styles", () => {
    const { container } = render(<Footer />);

    const footer = container.querySelector("footer");
    expect(footer).toHaveClass("h-44 w-full bg-[#404040]");
  });

  it("renders logo image with correct attributes", () => {
    render(<Footer />);

    const logo = screen.getByAltText("ApplyDigital Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass("object-contain");
  });

  it("contains link to home page", () => {
    render(<Footer />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveClass("relative w-40 h-12");
  });

  it("has correct container layout", () => {
    const { container } = render(<Footer />);

    const containerDiv = container.querySelector("div");
    expect(containerDiv).toHaveClass(
      "max-w-[1440px] mx-auto flex items-center justify-center"
    );
  });
});
