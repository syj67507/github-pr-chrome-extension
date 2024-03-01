import React from "react";
import ClearStorageSetting from "./ClearStorageSetting";
import AccessTokenSetting from "./AccessTokenSetting";

export default function Settings() {
  return (
    <>
      <AccessTokenSetting />
      <ClearStorageSetting />
    </>
  );
}
