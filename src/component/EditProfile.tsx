import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

interface FormDataType {
  username: string;
  name: string;
  website: string;
  bio: string;
  gender: string;
  profileimage: string;
}

function EditProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormDataType>({
    username: "",
    name: "",
    website: "",
    bio: "",
    gender: "",
    profileimage: "/profile_image.svg",
  });

  // In your component state
  const [websites, setWebsites] = useState<string[]>(formData.website ? [formData.website] : [""]);

  // Handle website change dynamically
  const handleWebsiteChange = (index: number, value: string) => {
    const updatedWebsites = [...websites];
    updatedWebsites[index] = value;
    setWebsites(updatedWebsites);
  };

  // Add new empty website input
  const addWebsite = () => {
    setWebsites([...websites, ""]);
  };

  // Remove a website input
  const removeWebsite = (index: number) => {
    const updatedWebsites = websites.filter((_, i) => i !== index);
    setWebsites(updatedWebsites);
  };


  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please login again.");

        const res = await axios.get("http://localhost:3000/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Populate form with saved data
        setFormData({
          username: res.data.profile.username || "",
          name: res.data.profile.name || "",
          website: res.data.profile.website || "",
          bio: res.data.profile.bio || "",
          gender: res.data.profile.gender || "",
          profileimage: res.data.profile.profileimage || "/profile_image.svg",
        });
      } catch (err: any) {
        console.error("❌ Failed to fetch profile", err.response || err.message);
        toast.error("❌ Could not load profile");
      }
    };

    fetchProfile();
  }, []);

  // Handle text/select input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    if (id === "bio" && value.length > 200) return; // max 200 chars

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle file selection + preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    // Show preview immediately
    const previewUrl = URL.createObjectURL(selectedFile);
    setFormData((prev) => ({ ...prev, profileimage: previewUrl }));
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput")?.click();
  };

  // Submit updated profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login again.");

      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("website", formData.website);
      formDataToSend.append("gender", formData.gender);

      if (file) formDataToSend.append("profileimage", file);

      const res = await axios.post(
        "http://localhost:3000/api/profile/editprofile",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData((prev) => ({ ...prev, ...res.data.profile }));
      toast.success("Profile updated successfully ✅");
      navigate("/profile");
    } catch (err: any) {
      console.error("❌ Failed to save profile", err.response?.data || err.message);
      toast.error("❌ Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 pb-4">
      <div className="text-2xl font-bold flex justify-center p-10">Edit Profile</div>

      {/* Profile Image */}
      <div className="flex justify-between items-center px-10 py-4 border border-gray-700 rounded-md mx-8 my-4">
        <div className="flex gap-4 items-center">
          {loading ? (
            <CircularProgress size={40} className="text-blue-500" />
          ) : (
            <img
              src={formData.profileimage}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          )}
          <div className="flex flex-col">
            <span className="text-white">@{formData.username || "username"}</span>
            <span className="text-white">{formData.name || "Name"}</span>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <Button variant="contained" onClick={handleButtonClick} disabled={loading}>
          {loading ? "Loading..." : "Change Photo"}
        </Button>
      </div>

      {/* Username */}
      <div className="my-2 flex flex-col mx-9 gap-2">
        <label htmlFor="username" className="text-gray-300 text-lg font-medium">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={handleChange}
          className="border border-gray-500 rounded-md px-3 py-5 text-base bg-transparent text-white focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Name */}
      <div className="my-2 flex flex-col mx-9 gap-2">
        <label htmlFor="name" className="text-gray-300 text-lg font-medium">Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-500 rounded-md px-3 py-5 text-base bg-transparent text-white focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Website */}
      <div className="mx-9 flex flex-col gap-2">
        <span className="text-gray-300 text-lg font-medium">Websites</span>

        {websites.map((site, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              value={site}
              onChange={(e) => handleWebsiteChange(index, e.target.value)}
              className="w-full border border-gray-500 rounded-md px-3 py-3 text-base bg-transparent text-white focus:outline-none focus:border-blue-500"
              placeholder={`Website ${index + 1}`}
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeWebsite(index)}
                className="text-red-500 px-2"
              >
                ❌
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addWebsite}
          className="mt-2 px-4 py-2 max-w-max bg-blue-500 text-white rounded-md"
        >
          + Add Website
        </button>
      </div>

      {/* Bio */}
      <div className="my-2 flex flex-col mx-9 gap-2">
        <label htmlFor="bio" className="text-gray-300 text-lg font-medium">Bio</label>
        <input
          type="text"
          id="bio"
          value={formData.bio}
          onChange={handleChange}
          className="border border-gray-500 rounded-md px-3 py-5 text-base bg-transparent text-white focus:outline-none focus:border-blue-500"
        />
        <span className="relative left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          {formData.bio.length}/200
        </span>
      </div>

      {/* Gender */}
      <div className="mx-9 max-w-xs">
        <label htmlFor="gender" className="block text-lg font-medium text-white mb-2">
          Gender
        </label>
        <select
          id="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border border-gray-500 rounded-md bg-transparent px-3 py-3 text-base focus:outline-none focus:border-blue-500
               appearance-none hover:bg-gray-700 hover:text-gray-300 transition-colors duration-200"
        >
          <option value="" disabled>Select Gender</option>
          <option value="male" className="bg-gray-800 text-white hover:bg-gray-700 hover:text-gray-300">Male</option>
          <option value="female" className="bg-gray-800 text-white hover:bg-gray-700 hover:text-gray-300">Female</option>
          <option value="other" className="bg-gray-800 text-white hover:bg-gray-700 hover:text-gray-300">Rather not say</option>
        </select>
      </div>


      {/* Submit */}
      <div className="flex justify-center mt-6">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          className="!bg-blue-600 hover:!bg-blue-700"
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default EditProfile;

