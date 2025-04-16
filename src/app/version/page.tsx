import pkg from "../../../package.json";

export default function Version() {
  return <h1>Current Version: {pkg.version}</h1>;
}
