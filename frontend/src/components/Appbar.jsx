import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Appbar = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="shadow-lg shadow-slate-400  bg-white py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="text-4xl text-blue-600">💸</span>
          <span className="text-2xl font-bold text-blue-600 tracking-wide">
            PayTM App
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div>
            <span className="text-blue-500 font-semibold">{username}</span>
          </div>
          {/* ============ */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="rounded-full text-xl h-10 w-10 bg-slate-200 flex justify-center items-center">
                {username[0].toUpperCase()}
              </MenuButton>
            </div>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Account settings
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    class="block px-4 py-2 text-sm text-gray-700"
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
          {/* ============ */}
        </div>
      </div>
    </div>
  );
};

export default memo(Appbar);
