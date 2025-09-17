import BookmarkList from "../sections/bookmark-list";
import BookmarksSidebar from "../sections/sidebar";

const BookmarksView = () => {
    return (
        <div className="flex border-r border-l border-gray-200 h-full">
            <BookmarksSidebar />
            <BookmarkList /> 
        </div>
    )
}

export default BookmarksView;