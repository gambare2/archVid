import { useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";
import { Divider } from "@mui/material";
import axios from "axios";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/profile/me`,
          // "http://localhost:3000/api/profile/me",
           {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProfile(res.data.profile);
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p className="text-white">Loading...</p>;

  return (
    <>
      {/* Main profile page */}
      <div className={`bg-gray-800 h-[100vh] ${showImage ? "filter blur-sm" : ""}`}>
        <div>
          <div className="flex flex-row gap-16 justify-center items-center py-10">
            <span>
              <img
                src={profile.profileimage}
                alt="Profile"
                className="size-40 rounded-full cursor-pointer"
                onClick={() => setShowImage(true)}
              />
            </span>
            <div className="flex flex-col gap-4">
              <span className="flex flex-row gap-12">
                <Link
                  to="/editprofile"
                  className="bg-blue-500 px-6 py-2 mx-3 rounded-xl"
                >
                  Edit Profile
                </Link>
                <Link
                  to="/setting"
                  className="bg-blue-500 px-6 py-2 mx-3 rounded-xl"
                >
                  Setting <SettingsIcon />
                </Link>
              </span>
              <span className="flex flex-col text-white">
                <div className="flex flex-row gap-8 mx-4 mb-3">
                  <div className="flex flex-col">
                    <span>@{profile.username}</span>
                    <span className="text-gray-200 text-xs">{profile.name}</span>
                  </div>
                  <Divider
                    orientation="vertical"
                    flexItem
                    variant="middle"
                    sx={{ bgcolor: "white" }}
                  />
                  <div className="flex flex-row gap-8">
                    <div className="flex flex-col">
                      <span>2000</span>
                      <span className="text-gray-200 text-xs">followers</span>
                    </div>
                    <Divider
                      orientation="vertical"
                      flexItem
                      variant="middle"
                      sx={{ bgcolor: "white" }}
                    />
                    <div className="flex flex-col">
                      <span>1500</span>
                      <span className="text-gray-200 text-xs">following</span>
                    </div>
                  </div>
                </div>
                <Divider sx={{ bgcolor: "white" }} />
                <span className="mt-4 max-w-[30vw] text-justify mb-4 text-gray-400">{profile.bio}</span>
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-blue-600"
                >
                  <LinkIcon /> {profile.website}
                </a>
              </span>
            </div>
          </div>
          <Divider sx={{ bgcolor: "white" }} variant="middle" />
        </div>
      </div>

      {/* Lightbox overlay */}
      {showImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setShowImage(false)}
        >
          <img
            src={profile.profileimage}
            alt="Profile Large"
            className="max-h-[50vh] max-w-[100vw] rounded-3xl shadow-lg"
          />
        </div>
      )}
    </>
  );
}
