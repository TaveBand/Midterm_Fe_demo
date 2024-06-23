import { useState, useEffect } from "react";
import instance from "./axios";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Pagenumber from "../components/Pagenumber";
import SessionBtns from "../components/SessionBtns";
import "./Drum.css";

function Drum() {
  const { post_id } = useParams();
  const { board_id } = useParams();
  
  const [posts, setPosts] = useState([]);
  const [coverimages, setCoverImages] = useState();
  const [currentPosts, setCurrentPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isWriting, setIsWriting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const handlePageChange = (page) => {
    setPage(page);
  };
  const [postPerPage] = useState(2);

  const IndexLastPost = page * postPerPage;
  const IndexFirstPost = IndexLastPost - postPerPage;
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await instance.get(`/dailband/boards/5`);
      // const res = await instance.get(`/dailband/boards/${board_id}`);
      setPosts(res.data.posts);
      setCurrentPosts(res.data.posts.slice(IndexFirstPost, IndexLastPost));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

console.log(board_id)
  useEffect(() => {
    fetchPosts();
  }, [IndexFirstPost, IndexLastPost, page]);

  const handleWriteClick = () => {
    setIsWriting(true); // 글 작성
    setIsEditing(false);
    setTitle("");
    setContent("");
    setImage(null);
    setImagePreview(null);
  };
  const handleBackClick = () => {
    setIsWriting(false); // 다시 게시판으로
    setIsEditing(false);
    setTitle("");
    setContent("");
    setImage(null);
    setImagePreview(null);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ title, content, imagePreview });

    const newPost = {
      title,
      content,
      file_url: imagePreview,
      nickname: "이름",
    };

    try {
      if (isEditing) {
        await instance.put(`/posts/${editingPostId}`, newPost);
      } else {
        await instance.post("/posts", newPost);
      }
      await fetchPosts();
    } catch (error) {
      console.error("Error submitting post:", error);
    }

    setIsWriting(false);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="BoardPage">
        <Header />
        <SessionBtns initialSelectedIndex={0} />
        <div
          className="SessionBoards"
          style={{ height: isWriting ? "550px" : "850px" }}
        >
          {!isWriting ? (
            <>
              <div className="TopBoard">
                <div className="Sessionpost">
                  <h1>WHIPLASH~! 드러머들 모여라!</h1>
                  {currentPosts.slice(0, 2).map((post) => (
                    <Link
                      to={`/boards/${board_id}/${post.post_id}`}
                      style={{ textDecoration: "none" }}
                      key={post.post_id}
                    >
                      <div key={post.id} className="SessionPostbox">
                        <div className="SessionUserbox">
                          <img
                            className="SessionProfile"
                            src="/img/basicprofile.png"
                            alt="profile"
                          ></img>
                          <p style={{ marginTop: "10px" }}>{post.nickname}</p>
                        </div>
                        <div className="SessionContent">
                          <div className="Boardname">
                            <h3 style={{ color: "rgb(51, 0, 119)" }}>
                              세션 게시판
                            </h3>
                          </div>
                          <h3 style={{ marginTop: "5px" }}>{post.title}</h3>
                          <p>{post.content}</p>
                          <p className="Posttime">작성날짜 {post.created_at}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <Pagenumber
                  totalCount={posts.length}
                  page={page}
                  postPerPage={postPerPage}
                  pageRangeDisplayed={10}
                  handlePageChange={handlePageChange}
                />
              </div>
              <div className="BottomBoard">
                <h2>연주 영상</h2>
                <div className="Videobox">
                  <figure className="Videopost">
                    <img src="/img/videoimg.png" alt="videoimg"></img>
                    <figcaption>
                      <h3>클릭해서</h3>
                      <h3>이동하기!</h3>
                      <p>유튜브 링크로 이동합니다.</p>
                      <i>
                        <img src="/img/rightarrow.png" alt="rightarrow"></img>
                      </i>
                    </figcaption>
                    <div className="VideoTitle">영상 제목</div>
                  </figure>

                  <figure className="Videopost">
                    <img src="/img/videoimg.png" alt="videoimg"></img>
                    <figcaption>
                      <h3>클릭해서</h3>
                      <h3>이동하기!</h3>
                      <p>유튜브 링크로 이동합니다.</p>
                      <i>
                        <img src="/img/rightarrow.png" alt="rightarrow"></img>
                      </i>
                    </figcaption>
                    <div className="VideoTitle">영상 제목</div>
                  </figure>
                  <figure className="Videopost">
                    <img src="/img/videoimg.png" alt="videoimg"></img>
                    <figcaption>
                      <h3>클릭해서</h3>
                      <h3>이동하기!</h3>
                      <p>유튜브 링크로 이동합니다.</p>
                      <i>
                        <img src="/img/rightarrow.png" alt="rightarrow"></img>
                      </i>
                    </figcaption>
                    <div className="VideoTitle">영상 제목</div>
                  </figure>
                  <figure className="Videopost">
                    <img src="/img/videoimg.png" alt="videoimg"></img>
                    <figcaption>
                      <h3>클릭해서</h3>
                      <h3>이동하기!</h3>
                      <p>유튜브 링크로 이동합니다.</p>
                      <i>
                        <img src="/img/rightarrow.png" alt="rightarrow"></img>
                      </i>
                    </figcaption>
                    <div className="VideoTitle">영상 제목</div>
                  </figure>
                </div>
                <button
                  className="WriteBtn"
                  onClick={handleWriteClick}
                  style={{ cursor: "pointer" }}
                >
                  글쓰기
                </button>
              </div>
            </>
          ) : (
            <div className="SessionWriteBoard">
              <button
                type="button"
                onClick={handleBackClick}
                className="Backbutton"
              >
                <img
                  className="Backbutton"
                  alt="Backbutton"
                  src="/img/arrow.png"
                />
              </button>
              <form onSubmit={handleSubmit}>
                <div className="ImgUpload">
                  {imagePreview && (
                    <img src={imagePreview} alt="ImagePreview" width="300px" />
                  )}
                  <label>
                    이미지 업로드:
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                <div className="TextUpload">
                  <div>
                    <label style={{ color: "grey" }}>게시판 종류 :</label>
                    <select>
                      <option>드럼 게시판 게시글</option>
                      <option>드럼 게시판 연주영상</option>
                    </select>
                  </div>

                  <input
                    type="text"
                    className="SessionInputTitle"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="제목을 입력해주세요"
                    required
                  />

                  <textarea
                    className="SessionInputContent"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="내용을 입력해주세요"
                    required
                  ></textarea>
                  <div className="EditBtns">
                    <button type="button" onClick={handleBackClick}>
                      취소
                    </button>
                    <button type="submit" className="SubmitBtn">
                      {isEditing ? "수정하기" : "작성하기"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Drum;
