import React, { useState } from "react";

function Nav() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <div className="nav">
      <button onClick={handleToggle}>Nav Bar</button>
      {!isCollapsed && <div class="inner-div">Collapsible content goes here.</div>}
    </div>
  );
}

export default Nav;