export class APIURLS {
  public static readonly BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/v1/api";
  public static readonly POST = "Post";
  public static readonly POST_FOLLOWED = "Post/getbyfollowed";
  public static readonly POST_RANDOM = "Post/getbyrandom";
  public static readonly POST_GETBYUSERID = "Post/GetByUserId";
  public static readonly USERPROFILEPHOTO = "User/ProfilePhotoUpdate";
  public static readonly USERCOVERPICTURE = "User/CoverPictureUpdate";
  public static readonly USER = "User";
  public static readonly USER_GET_CONTENT_CREATOR = "User/GetContentCreator";
  public static readonly USER_BY_NAME = "User/GetByName";
  public static readonly COUNTRIES = "Country";
  public static readonly CITIY = "City";
  public static readonly CHANGE_PASSWORD = "user/ChangePassword";
  public static readonly MESSAGE = "Message";
  public static readonly CHATS = "Message/GetMessagesGrouped";
  public static readonly USER_GETBYID = "User/GetById";
  public static readonly AUTH_LOGIN_CREATOR = "Auth/LoginContentCreator";
  public static readonly AUTH_LOGIN_FAN = "Auth/LoginFan";
  public static readonly POST_COMMENT = "PostComment";
  public static readonly POST_LIKE = "PostLike/Like";
  public static readonly POST_UNLIKE = "PostLike/Unlike";
  public static readonly AUTH_REGISTER_CREATOR = "Auth/RegisterContentCreator";
  public static readonly AUTH_REGISTER_FAN = "Auth/RegisterFan";
  public static readonly USER_SEARCH = "User/Search";
  public static readonly NOTIFICATION= "Notification";
  public static readonly USER_SUBSCRIBE= "Subscriber";
  public static readonly USER_FOLLOW= "UserFollower/Follow";
  public static readonly USER_UNFOLLOW= "UserFollower/Unfollow";
  public static readonly USER_GETFOLLOWER= "UserFollower/getmyfollower";
  public static readonly USER_GETFOLLOWED= "UserFollower/getmyfollowed";
  public static readonly USER_FOLLOWER= "UserFollower";

}
