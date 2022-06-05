import React from "react";

import styles from "./Search.module.css";
import PropTypes from "prop-types";

const Search = ({ onUpdateSearch, disabled, inputId, placeholder }) => {
    const searchHandler = (e) => {
        onUpdateSearch(e.target.value);
    };

    return (
        <section className={styles.searchArea}>
            <label id="inputLabel" className={styles.label} htmlFor="eventSearch" tabIndex="-1">
        Search events
            </label>
            <input
                type="search"
                name="eventSearch"
                className={styles.search}
                disabled={disabled}
                id={inputId}
                placeholder={placeholder || "e.g. Pilgrims"}
                onChange={searchHandler}
                aria-labelledby="inputLabel"
            />
        </section>
    );
};

Search.propTypes = {
    onUpdateSearch: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    inputId: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
};

export default Search;
