import { Button } from "@mui/material"


function EditProfile() {
  return (
    <div className="bg-gray-800 h-screen">
      <div>
        <div className="text-2xl font-bold flex justify-start">
          Edit Profile
        </div>
        <div>
          <div className="flex justify-between items-center px-10 py-4 border border-gray-700 rounded-md p-2 mx-8 my-4 ">
            <div className="flex gap-4 justify-between items-center">
            <img src="/profile_image.svg" alt="Profile Image" className="w-10 h-10" />
            <div className="flex flex-col justify-start items-start">

              <span className="text-white text-left">
                thakur-aryan864
              </span>
              <span className="text-white text-left">
                Your Name
              </span>
            </div>

            </div>
            <div>
            <Button variant="contained">Edit Profile</Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EditProfile
