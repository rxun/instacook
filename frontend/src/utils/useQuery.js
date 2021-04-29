import { useLocation } from "react-router";

export default () => {
  return new URLSearchParams(useLocation().search);
};
