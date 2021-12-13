import React, { Component } from "react";
import axios from "axios";
import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Loader from "./Components/Loader/Loader";
import Button from "./Components/Button/Button";
import Modal from "./Components/Modal/Modal";
import styles from "./App.module.css";

class App extends Component {
  state = {
    hits: [],
    error: null,
    loading: false,
    search: "",
    page: 1,
    isModalOpen: false,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.handleSearchProducts();
    }
  }

  openModal = (modalImage) => {
    this.setState({ isModalOpen: true, modalImage });
  };

  closeModal = (evt) => {
    if (evt.target === evt.currentTarget || evt.key === "Escape")
      this.setState({ isModalOpen: false });
  };

  handleSearchProducts = async () => {
    const KEY = "21692932-2d6497f32a8ca8a26a2f2fcb6";
    const { page, search } = this.state;
    this.setState({ loading: true });
    try {
      const { data } = await axios.get(
        `https://pixabay.com/api/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12
`
      );

      this.setState((prevState) => ({
        hits: [...prevState.hits, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.response.hits });
    } finally {
      this.setState({ loading: false });
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  handleSubmit = (search) => {
    this.setState({ search, hits: [], page: 1 });
  };

  showMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  render() {
    const { hits, loading, isModalOpen, modalImage } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar searchProducts={this.handleSubmit} />
        {loading && <Loader />}
        <ImageGallery hits={hits} openModal={this.openModal} />
        {!!hits.length && <Button showMore={this.showMore} />}
        {isModalOpen && (
          <Modal modalImage={modalImage} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
