import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
export default function SearchComponet() {
    const [isSearchVisible, setSearchVisible] = useState(false);
    const searchRef = useRef(null);

    const toggleSearch = () => {
        setSearchVisible(true);
    };

    const handleClickOutside = (event) => {
        // Check if the click is outside the search field
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setSearchVisible(false);
        }
    };

    useEffect(() => {
        // Add event listener when the search is visible
        if (isSearchVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Clean up the event listener on unmount or when the search is hidden
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSearchVisible]);

    return (
        <div className="searchBar">
            <IoIosSearch onClick={toggleSearch} />

            <div>
                {isSearchVisible && (
                    <div style={styles.fullPageSearch} ref={searchRef}>
                        <input
                            type="text"
                            placeholder="Search..."
                            style={styles.searchInput}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    fullPageSearch: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    searchInput: {
        padding: "10px",
        fontSize: "20px",
        width: "80%",
        borderRadius: "0",
        border: "none",
        backgroundColor: "rgb(255 255 255 / 41%)",
        color: "#f0ebeb",
    },
};
