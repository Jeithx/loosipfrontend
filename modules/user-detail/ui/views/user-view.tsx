import Recent from "../sections/recent";
import UserInfo from "../sections/user-info";
import UserPosts from "../sections/user-posts";

const UserView = () => {
  return (
    <div className="flex p-2 pt-4 w-full">
      <div className="w-full max-w-4xl flex flex-col gap-5">
        <UserInfo />
        <UserPosts />
      </div>
      {/* <Recent /> */}
    </div>
  );
};

export default UserView;
