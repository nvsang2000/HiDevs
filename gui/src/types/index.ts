import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type SearchParam = {
  limit?: string
  page?: string
  search?: string
}
