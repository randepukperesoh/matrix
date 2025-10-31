import { Fragment } from "react";
import { Advantage } from "../lib";

interface IShortAdvantage extends Advantage {
  i: number;
  len: number;
}
export const ShortAdventagesCard = ({
  len,
  i,
  title,
  description,
}: IShortAdvantage) => {
  return (
    <Fragment>
      <div>
        <div
          className="text-white mb-1"
          style={{ fontSize: "32px", fontWeight: 700 }}
        >
          {title}
        </div>
        <div className="text-gray-500" style={{ fontSize: "14px" }}>
          {description}
        </div>
      </div>
      {i !== len - 1 && <div className="hidden sm:block w-px bg-gray-800" />}
    </Fragment>
  );
};
