import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogDataService from "../services/blog.service";

const Blog = props=> {

    const { id } = useParams();

    const initialBlogState = {
        _id: null,
        title: "",
        description: "",
        published: false
      };

      

    const [currentBlog, setCurrentBlog] = useState(initialBlogState);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getBlog(id);
      }, [id]);

    const getBlog = id => {
        BlogDataService.get(id)
        // console.log(_id)
          .then(response => {
            setCurrentBlog(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentBlog({ ...currentBlog, [name]: value });
      };

    const updatePublished = status => {
        var data = {
          id: currentBlog._id,
          title: currentBlog.title,
          description: currentBlog.description,
          published: status
        };
    
        BlogDataService.update(currentBlog._id, data)
          .then(response => {
            setCurrentBlog({ ...currentBlog, published: status });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };

    const updateBlog = () => {
        BlogDataService.update(currentBlog._id, currentBlog)
          .then(response => {
            console.log(response.data);
            setMessage("The blog was updated successfully!");
          })
          .catch(e => {
            console.log(e);
          });
      };

    const deleteBlog = () => {
        BlogDataService.remove(currentBlog._id)
          .then(response => {
            console.log(response.data);
            props.history.push("/blogs");
          })
          .catch(e => {
            console.log(e);
          });
      };

    return (
      <div>
      {currentBlog ? (
        <div className="edit-form">
          <h4>Blog</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentBlog.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentBlog.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentBlog.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentBlog.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteBlog}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBlog}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Blog...</p>
        </div>
      )}
    </div>
    )
};

export default Blog;