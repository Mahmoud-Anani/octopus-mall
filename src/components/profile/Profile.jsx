import React from "react";
// Fetching
import axios from "axios";
// Cookies
import { useCookies } from "react-cookie";
// Route
import { useNavigate } from "react-router-dom";
// Message
import { toast } from "react-toastify";
// Silf Component

// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LocalHospistalIcon from "@mui/icons-material/LocalHospital";
import Swal from "sweetalert2";
import Footer from "../layout/Footer";
import { Rtt } from "@mui/icons-material";
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function Profile() {
  const [getCookies, setCookies, removeCookies] = useCookies(["token"]);

  const [userData, setUserData] = React.useState({});

  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState("");

  const navigate = useNavigate();

  async function getUserInfo() {
    setLoading(true);
    await axios
      .get(`${import.meta.env.VITE_DOMAIN_NAME}/api/v1/auth/me`, {
        headers: {
          Authorization: getCookies.token,
        },
      })
      .then((res) => {
        setUserData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErrors(err);
        setLoading(false);
        removeCookies("token");
        toast.success(`Please Login Again`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/auth/sign-in");
      });
  }

  // handle addresses user
  async function deleteAddress(addressId) {
    await axios
      .delete(
        `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/addresses/${addressId}`,
        {
          headers: {
            Authorization: getCookies.token,
          },
        }
      )
      .then((res) => {
        toast.success(`Deleted Adress`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getUserInfo();
      });
  }

  // add addresses
  async function addAddress() {
    const { value: alias } = await Swal.fire({
      title: "Enter Alias For The Address",
      input: "text",
      inputPlaceholder: "Alias Address...",
      inputValidator: (value) => {
        if (!value) {
          return "You need to write alias!";
        }
      },
    });
    const { value: details } = await Swal.fire({
      title: "Detailed address",
      input: "text",
      inputPlaceholder: "Egypt / Dakahlia / Mit Ghamr / Rahmaniyah",
      inputValidator: (value) => {
        if (!value) {
          return "You need to write details!";
        }
      },
    });
    const { value: phone } = await Swal.fire({
      title: "Address phone number",
      input: "text",
      inputLabel: "Egyptian and Saudi numbers are only accepted",
      inputPlaceholder: "Enter Address phone number",
    });
    const { value: city } = await Swal.fire({
      title: "Address city",
      input: "text",
      inputPlaceholder: "Enter Address city",
    });
    const { value: postalCode } = await Swal.fire({
      title: "Postal Number",
      input: "text",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter the postal number",
    });

    if (!alias && !details) {
      return toast.error("You must enter alias and details", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (alias && details && phone && city && postalCode) {
      await axios
        .post(
          `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/addresses`,
          {
            alias,
            details,
            phone,
            city,
            postalCode,
          },
          {
            headers: {
              Authorization: getCookies.token,
            },
          }
        )
        .then((res) => {
          toast.success(`Created Adress`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          getUserInfo();
        })
        .catch((err) => {
          toast.error(err.response.data.errors[0].msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  }

  // change info
  // Name
  const [changeName, setChangeName] = React.useState(true);
  const [changeValName, setChangeValName] = React.useState("");
  const nameInfo = React.useRef(null);
  // Email
  const [changeEmail, setChangeEmail] = React.useState(true);
  const [changeValEmail, setChangeValEmail] = React.useState("");
  const EmailInfo = React.useRef(null);
  // Phone
  const [changePhone, setChangePhone] = React.useState(true);
  const [changeValPhone, setChangeValPhone] = React.useState("");
  const PhoneInfo = React.useRef(null);

  const putChangeName = async () =>
    await axios
      .put(
        `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/auth/me`,
        {
          name: changeValName,
          phone: userData.phone,
          email: userData.email,
        },
        {
          headers: { Authorization: getCookies.token },
        }
      )
      .then((res) => {
        setChangeName(true);
        setChangeValName("");
        toast.success(`Updated Data`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getUserInfo();
      }).catch(err => {
          toast.error(err.response.data.errors[0].msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      })
  const putChangeEmail = async () =>
    await axios
      .put(
        `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/auth/me`,
        {
          name: userData.name,
          phone: userData.phone,
          email: changeValEmail,
        },
        {
          headers: { Authorization: getCookies.token },
        }
      )
      .then((res) => {
        setChangeEmail(true);
        setChangeValEmail("");
        toast.success(`Updated Data`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getUserInfo();
      })
      .catch((err) => {
        toast.error(err.response.data.errors[0].msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  const putChangePhone = async () =>
    await axios
      .put(
        `${import.meta.env.VITE_DOMAIN_NAME}/api/v1/auth/me`,
        {
          name: userData.name,
          phone: changeValPhone,
          email: userData.email,
        },
        {
          headers: { Authorization: getCookies.token },
        }
      )
      .then((res) => {
        setChangePhone(true);
        setChangeValPhone("");
        toast.success(`Updated Data`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getUserInfo();
      })
      .catch((err) => {
        toast.error(err.response.data.errors[0].msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });

  React.useEffect(() => {
    getUserInfo();
  }, []);

  const Logout = () => {
    removeCookies("token");
    navigate("/auth/sign-in");
  };

  if (loading) {
    return (
      <div
        className={`h-[100vh] z-50 absolute w-full top-0 flex justify-center items-center bg-slate-800`}
      >
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={"section"} maxWidth={"xl"}>
        <CssBaseline />
        <div className={`bg-[#FFF] p-3 rounded-lg`}>
          <div
            className={`my-5 grid grid-cols-1 sm:grid-cols-2 justify-around gap-3 p-5 rounded-lg bg-[#f7c657]`}
          >
            <div className={`flex flex-wrap gap-4 items-start justify-center`}>
              {/* User Image */}
              <div className={` p-1 border-2 rounded-lg`}>
                {userData.userImg && (
                  <img
                    className={`rounded-lg w-80 sm:w-36 `}
                    src={userData.userImg}
                    alt={userData.name}
                  />
                )}
              </div>
              {/* Info */}
              <ul className={`flex flex-col gap-3 `}>
                <h4 className={`text-2xl font-bold`}>{userData.name}</h4>
                <li>
                  <span>Role: </span>
                  <span>{userData.role}</span>
                </li>
                <li>
                  <span>Email: </span>
                  <span>{userData.email}</span>
                </li>
                <li>
                  <span>Status: </span>
                  <span
                    className={`${
                      userData.active
                        ? "text-[#37bf65] bg-[#d9cc67]"
                        : "text-red-200 bg-red-500"
                    }  p-2 rounded-2xl`}
                  >
                    {userData.active ? "Active" : "Unactive"}
                  </span>
                </li>
              </ul>
            </div>
            {/* Button Sign Out */}
            <div className={`sm:text-end sm:px-10  `}>
              <button
                className={`bg-red-500 hover:bg-red-600 p-2 rounded-lg`}
                onClick={Logout}
              >
                Sign Out
              </button>
            </div>
          </div>
          <div>
            <div className={`flex justify-center gap-3 items-center`}>
              <h3 className={`text-xl font-semibold`}>INFO</h3>
              <hr className={`w-full`} />
            </div>
            {/* Info 2 */}
            <ul className={`flex flex-col gap-3 m-3`}>
              <li className="liHover w-fit px-5 flex gap-3 items-center">
                <span className={`font-semibold text-base`}>Name: </span>
                <input
                  onChange={(e) => setChangeValName(e.target.value)}
                  className={`${
                    !changeName && "border-2 bg-slate-100"
                  } p-2 rounded-lg`}
                  ref={nameInfo}
                  defaultValue={userData.name}
                  alt={userData.name}
                  disabled={changeName}
                />
                {changeValName === "" ? (
                  <button
                    onClick={() => {
                      setChangeName(false);
                      nameInfo.current.focus();
                    }}
                  >
                    <EditIcon
                      style={{ fontSize: "2rem" }}
                      className="border-2 iconNone p-[2px] rounded-full cursor-pointer"
                    />
                  </button>
                ) : (
                  <button
                    onClick={putChangeName}
                    className={`bg-[#127FFF] p-2 rounded-lg text-white`}
                  >
                    Save Change
                  </button>
                )}
              </li>
              <li className="px-5 ">
                <span className={`font-semibold text-base`}>Slug: </span>
                <span>{userData.slug}</span>
              </li>
              <li className="px-5 ">
                <span className={`font-semibold text-base`}>Role: </span>
                <span>{userData.role}</span>
              </li>
              <li className="liHover w-fit px-5  flex gap-3 items-center">
                <span className={`font-semibold text-base`}>Email: </span>
                <input
                  onChange={(e) => setChangeValEmail(e.target.value)}
                  className={`${
                    !changeEmail && "border-2 bg-slate-100"
                  } p-2 rounded-lg`}
                  ref={EmailInfo}
                  defaultValue={userData.email}
                  alt={userData.email}
                  disabled={changeEmail}
                />
                {changeValEmail === "" ? (
                  <button
                    onClick={() => {
                      setChangeEmail(false);
                      EmailInfo.current.focus();
                    }}
                  >
                    <EditIcon
                      style={{ fontSize: "2rem" }}
                      className="border-2 iconNone p-[2px] rounded-full cursor-pointer"
                    />
                  </button>
                ) : (
                  <button onClick={putChangeEmail} className={`bg-[#127FFF] p-2 rounded-lg text-white`}>
                    Save Change
                  </button>
                )}
              </li>
              <li className="liHover w-fit px-5  flex gap-3 items-center">
                <span className={`font-semibold text-base`}>
                  Phone Number:{" "}
                </span>
                <input
                  onChange={(e) => setChangeValPhone(e.target.value)}
                  className={`${
                    !changePhone && "border-2 bg-slate-100"
                  } p-2 rounded-lg`}
                  ref={PhoneInfo}
                  defaultValue={userData.phone}
                  alt={userData.phone}
                  disabled={changePhone}
                />
                {changeValPhone === "" ? (
                  <button
                    onClick={() => {
                      setChangePhone(false);
                      PhoneInfo.current.focus();
                    }}
                  >
                    <EditIcon
                      style={{ fontSize: "2rem" }}
                      className="border-2 iconNone p-[2px] rounded-full cursor-pointer"
                    />
                  </button>
                ) : (
                  <button onClick={putChangePhone} className={`bg-[#127FFF] p-2 rounded-lg text-white`}>
                    Save Change
                  </button>
                )}
              </li>
              <li className="px-5 ">
                <span className={`font-semibold text-base`}>Status: </span>
                <span className={`p-2 rounded-2xl`}>
                  {userData.active ? "Active" : "Unactive"}
                </span>
              </li>
            </ul>
            <div>
              <div className={`flex justify-center gap-3 items-center`}>
                <h3 className={`text-xl font-semibold whitespace-nowrap`}>
                  Shipping Address:{" "}
                </h3>
                <hr className={`w-full`} />
              </div>

              <div className={`flex flex-wrap gap-3`}>
                {userData.addresses && (
                  <div className={` `}>
                    {userData.addresses.length > 0 && (
                      <div className={`my-5 flex flex-wrap gap-3`}>
                        {userData.addresses.map((address) => (
                          <div
                            key={address._id}
                            className={`p-2 rounded-lg border-2`}
                          >
                            <ul>
                              {address.alias && (
                                <li className="flex justify-between">
                                  <h6 className={`font-bold text-xl my-2`}>
                                    {address.alias}
                                  </h6>
                                  <button
                                    onClick={() => deleteAddress(address._id)}
                                  >
                                    <DeleteIcon />
                                  </button>
                                </li>
                              )}
                              {address.details && (
                                <li>
                                  <span className={`font-semibold text-base`}>
                                    Details:{" "}
                                  </span>
                                  <span>{address.details}</span>
                                </li>
                              )}
                              {address.phone && (
                                <li>
                                  <span className={`font-semibold text-base`}>
                                    Phone:{" "}
                                  </span>
                                  <span>{address.phone}</span>
                                </li>
                              )}
                              {address.city && (
                                <li>
                                  <span className={`font-semibold text-base`}>
                                    City:{" "}
                                  </span>
                                  <span>{address.city}</span>
                                </li>
                              )}
                              {address.postalCode && (
                                <li>
                                  <span
                                    className={`whitespace-nowrap font-semibold text-base`}
                                  >
                                    Postal Code:{" "}
                                  </span>
                                  <span>{address.postalCode}</span>
                                </li>
                              )}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <button
                  className="border-2 rounded-xl my-2"
                  onClick={addAddress}
                >
                  <LocalHospistalIcon
                    style={{ fontSize: "3rem" }}
                    className=" text-[#127FFF]"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default Profile;
