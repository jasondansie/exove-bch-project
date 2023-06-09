import React from "react";
import MenuItem from "../shared/MenuItem";
import { faChartSimple, faMessage } from "@fortawesome/free-solid-svg-icons";

const UserMenus = () => {
  return (
    <div>
      <MenuItem
        name="DashBoard"
        icon={faChartSimple}
        link="/home"
        pageTitle="Dashboard"
      />
      <MenuItem name="Inbox" icon={faMessage} link="/inbox" pageTitle="Inbox" />{" "}
    </div>
  );
};

export default UserMenus;
