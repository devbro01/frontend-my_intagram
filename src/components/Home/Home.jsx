import React, { useEffect, useState } from "react";
import "./Home.scss"; // css design
import { Link } from "react-router-dom";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firestore, auth } from "../../firebase/firebase";
import CreatePost from "../Post/CreatePost/CreatePost";
import Likes from "../Likes/Likes";
import Comment from "../Likes/Comment";
import SearchedUser from "./SearchedUser";
// import { useSelector } from "react-redux";

const Home = ({ user }) => {
  // const { postLoading } = useSelector((state) => state.posts);
  const [modalState, setModalState] = useState(false);
  const [commentModal, setCommentModal] = useState(true);
  const [article, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState(users);

  useEffect(() => {
    const fetchArticles = async () => {
      const articleRef = collection(firestore, "Articles");
      const q = query(articleRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const articlesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArticles(articlesData);
      });
    };

    const fetchUsers = async () => {
      const userRef = collection(firestore, "Users");
      const q = query(userRef, orderBy("userPhoto", "asc"));
      onSnapshot(q, (snapshot) => {
        const usersData = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((userData) => userData.id !== user.uid);
        setUsers(usersData);
      });
    };

    fetchArticles();
    fetchUsers();
  }, [user]);

  const handleLogOut = () => {
    auth.signOut();
  };

  const handleDeletePost = async (postId) => {
    const postRef = doc(firestore, "Articles", postId);

    try {
      await deleteDoc(postRef);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);

    // Filter the data based on the search term, excluding the current user
    const filteredResults = users.filter(
      (item) =>
        item.userName.toLowerCase().includes(newSearchTerm) &&
        item.userName !== user.displayName
    );

    setFilteredData(filteredResults);
  };

  return (
    <>
      {/* TODO: */}
      <div className="home">
        <header className="grid main-header">
          <div className="flex-container header-container">
            <span className="logo logo-nav header-item">
              <a href="/home">Instagram</a>
            </span>

            <div className="header-item searchbar">
              <div className="flex-container position-relative">
                <div className="search-icon-container">
                  <i className="fas fa-search search-nav-icon"></i>
                </div>
                <input
                  id="searchbar"
                  type="text"
                  className="form-control searchbar-input"
                  placeholder="Search..."
                  onChange={handleInputChange}
                />
                {searchTerm ? <SearchedUser data={filteredData} /> : null}
              </div>
            </div>
            <nav className="header-item main-nav">
              <ul className="navbar flex-container">
                <li className="navbar-item">
                  <Link to="/home">
                    <i className="fas fa-home"></i>
                  </Link>
                </li>
                <li
                  className="navbar-item"
                  onClick={() => setModalState(!modalState)}
                >
                  <i className="fas fa-plus"></i>
                </li>
                <li className="navbar-item no-hover">
                  <Link to="/profile">
                    <img
                      style={{ marginBottom: "8px" }}
                      src={user?.photoURL}
                      alt=""
                    />
                  </Link>
                </li>
                <li className="navbar-item">
                  <i className="fas fa-sign-out-alt" onClick={handleLogOut} />
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <section className="main-content grid">
          <div className="main-gallery-wrapper flex-container">
            {article?.map((el) => (
              <div key={el.id} className="card-wrapper flex-container">
                <div className="card-header grid">
                  <div className="header-img-container flex-container">
                    <img
                      className="card-header-img"
                      src={el.createdUserPhoto}
                      alt=""
                    />
                  </div>
                  <div className="d-flex">
                    <div style={{ width: "120px" }}>
                      <span className="card-title">{el.createdBy}</span>
                      <br />
                      <span className="card-subtitle">{el.title}</span>
                    </div>
                    <div style={{ marginLeft: "240px" }}>
                      {el.createdBy === user.displayName && (
                        <span
                          className="card-icon card-icon-right text-danger"
                          onClick={() => handleDeletePost(el.id)}
                        >
                          <i className="fas fa-trash"></i> Delete
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="card-opt-btn flex-container">
                    <i className="bi bi-three-dots"></i>
                  </div>
                </div>
                <div className="card-img-container">
                  <img src={el.imageUrl} className="card-img" alt="" />
                </div>
                <span className="" style={{ marginLeft: "320px" }}>
                  {el.createdAt.toDate().toLocaleString()}
                </span>
                <div className="card-data flex-container">
                  <div className="card-icons flex-container">
                    <span className="card-icon card-icon-left">
                      <Likes id={el.id} likes={el.likes} />
                    </span>
                    <span className="card-icon card-icon-left">
                      <i className="bi bi-chat"></i>
                    </span>
                    <span className="card-icon card-icon-left">
                      <i className="bi bi-send"></i>
                    </span>
                    <span className="card-icon card-icon-right">
                      <i className="bi bi-bookmark"></i>
                    </span>
                  </div>
                  <span className="bold card-text">{} Likes</span>
                  <span className="card-text">
                    <span className="bold title-margin">{el.createdBy}</span>
                    {el.description}
                  </span>
                  <span
                    className="card-text comments-btn"
                    onClick={() => setCommentModal(el.id)}
                  >
                    See more comments
                  </span>
                  {commentModal === el.id ? (
                    <Comment
                      id={el.id}
                      postImg={el.imageUrl}
                      setCommentModal={setCommentModal}
                      createdUserPhoto={el.createdUserPhoto}
                    />
                  ) : null}
                  <span className="card-time"></span>
                  <div className="add-comment-container flex-container">
                    <span className="card-icon">
                      <i className="bi bi-emoji-smile"></i>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="sidebar">
            <div className="sidebar-menu-container">
              <div className="sidebar-card sidebar-header grid">
                <img
                  src={user?.photoURL}
                  alt=""
                  className="sidebar-img sidebar-hd-img"
                />
                <span className="sidebar-title card-title">
                  {user ? user?.displayName : null}
                </span>
                <span className="card-subtitle sidebar-subtitle">
                  {user ? user?.email : null}
                </span>
                <span className="sidebar-btn">
                  <Link to="/profile">Change</Link>
                </span>
              </div>
              <div className="suggestions-header grid">
                <span className="suggestions-text">Suggestions for you</span>
                <span className="sidebar-btn-alt">See all</span>
              </div>
              {users
                .filter((el) => el.userName !== user.displayName)
                .map((el) => (
                  <div
                    className="sidebar-card sidebar-card-alt grid"
                    key={el.id}
                  >
                    <img
                      src={el.userPhoto}
                      alt=""
                      className="sidebar-img side-bar-img-alt"
                    />
                    <span className="sidebar-title card-title">
                      {el.userName}
                    </span>
                    <Link to={`/${el.userName}`} className="sidebar-btn">
                      Follow
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
      {modalState ? (
        <CreatePost user={user} setModalState={setModalState} />
      ) : null}
    </>
    // TODO:
  );
};

export default Home;
