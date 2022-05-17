import './BlogCard.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

export const BlogCard = ({
  title,
  description,
  date,
  deletePost,
  handleEditFormShow,
  handleSelectPost,
  isAdmin,
}) => {
  const showEditForm = () => {
    handleSelectPost();
    handleEditFormShow();
  };

  return (
    <div className='post'>
      <div className='postContent'>
        <h2>{title}</h2>
        <p className="time">
          <strong><i>Создано: </i></strong>
          <span>{date}</span>
        </p>
        <p>{description}</p>
      </div>
      {isAdmin && (
        <div className='postControl'>
          <button className='editBtn' onClick={showEditForm}>
            <EditIcon />
          </button>
          <button className='deleteBtn' onClick={deletePost}>
            <DeleteForeverIcon />
          </button>
        </div>
      )}
    </div>
  );
};
