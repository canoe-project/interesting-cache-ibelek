import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './BlogPage.css';
import { AddPostForm } from './components/AddPostForm';
import { BlogCard } from './components/BlogCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import { EditPostForm } from './components/EditPostForm';
import { postsUrl } from '../../shared/projectData';
import { Header } from '../../components/Header/Header';
import { Pagination } from 'antd';
import CoinTable from "./components/CoinTable";

let source;

export const BlogPage = ({ userName, isLoggedIn, setIsLoggedIn }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [blogArr, setBlogArr] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const history = useHistory();
  const location = useLocation();

  const [totalElementsCount, setTotalElementsCount] = useState(0);
  const [currentPageElements, setCurrentPageElements] = useState([])

  const elementsPerPage = 2;
  const [offset, setOffset] = useState((location?.search.split('=')[1] - 1) * elementsPerPage || 0);
  const pagesCount = Math.ceil(totalElementsCount / elementsPerPage);

  const fetchPosts = async() => {
    source = await axios.CancelToken.source();
    await axios
      .get(postsUrl, { cancelToken: source.token })
      .then((response) => {
        setBlogArr(response.data);
        setTotalElementsCount(response.data.length);
        setCurrentPageElements(response.data.slice(offset, offset + elementsPerPage))
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handlePageClick = (pageNumber) => {
    const offset = (pageNumber - 1) * elementsPerPage;
    history.push(`/blog?page=${pageNumber}`)
    setOffset(offset);
    console.log(blogArr.slice(offset, offset + elementsPerPage))
    setCurrentPageElements(blogArr.slice(offset, offset + elementsPerPage))
  };

  console.log(offset)

  useEffect(() => {
    fetchPosts();
    return () => {
      if (source) {
        source.cancel('Axios get canceled');
      }
    };
  }, []);

  const deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
      setIsPending(true);
      axios
        .delete(`${postsUrl}${blogPost.id}`)
        .then((response) => {
          console.log('Пост удален => ', response.data);
          fetchPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addNewBlogPost = (blogPost) => {
    setIsPending(true);
    axios
      .post(postsUrl, blogPost)
      .then((response) => {
        console.log('Пост создан =>', response.data);
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editBlogPost = (updatedBlogPost) => {
    setIsPending(true);
    axios
      .put(`${postsUrl}${updatedBlogPost.id}`, updatedBlogPost)
      .then((response) => {
        console.log('Пост отредактирован =>', response.data);
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddFormShow = () => {
    setShowAddForm(true);
  };

  const handleAddFormHide = () => {
    setShowAddForm(false);
  };

  const handleEditFormShow = () => {
    setShowEditForm(true);
  };

  const handleEditFormHide = () => {
    setShowEditForm(false);
  };

  const handleSelectPost = (blogPost) => {
    setSelectedPost(blogPost);
  };

  const isAdmin = isLoggedIn && userName === 'admin';

  const blogPosts = currentPageElements.map((item) => {
    return (
      <BlogCard
        key={item.id}
        title={item.title}
        description={item.description}
        date={item.date}
        deletePost={() => deletePost(item)}
        handleEditFormShow={handleEditFormShow}
        handleSelectPost={() => handleSelectPost(item)}
        isAdmin={isAdmin}
      />
    );
  });

  if (currentPageElements.length === 0) return <h1>Загружаю данные...</h1>;

  const postsOpactiy = isPending ? 0.5 : 1;

  return (
    <>
      <Header
        userName={userName}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className='blogPage'>
        {showAddForm && (
          <AddPostForm
            blogArr={blogArr}
            addNewBlogPost={addNewBlogPost}
            handleAddFormHide={handleAddFormHide}
          />
        )}

        {showEditForm && (
          <EditPostForm
            handleEditFormHide={handleEditFormHide}
            selectedPost={selectedPost}
            editBlogPost={editBlogPost}
          />
        )}
        <>
          <h1>Новости криптовалют</h1>

          {isAdmin && (
            <div className='addNewPost'>
              <button className='blackBtn' onClick={handleAddFormShow}>
                Создать новый пост
              </button>
            </div>
          )}

          <div className='posts' style={{ opacity: postsOpactiy }}>
            {blogPosts}
            {pagesCount > 1 && (
              <Pagination
                defaultCurrent={location?.search.split('=')[1] || 1}
                onChange={handlePageClick}
                total={totalElementsCount}
                pageSize={elementsPerPage}
                showSizeChanger={false}
              />
            )}
          </div>
          <CoinTable />
          {isPending && <CircularProgress className='preloader' />}
        </>
      </div>
    </>
  );
};
