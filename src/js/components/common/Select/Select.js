/* eslint-disable no-param-reassign */
/* eslint-disable react/no-did-update-set-state */
import React, { PureComponent } from 'react';

class Select extends PureComponent {
  static defaultProps = {
    withCheckbox: false,
    withSearchBar: false,
  };

  getSelectTitle = props => {
    if (props.value) {
      const selectedOpt = props.options.find(
        opt => opt.value === props.value,
      );
      if (selectedOpt) {
        return selectedOpt.label;
      }
    }
    // just for quick solution
    if (props.name && props.doNotUseName) {
      return props.options[0] && props.options[0].label;
    }
    return props.name;
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    showList: false,
    searchText: '',
    selectTitle: this.getSelectTitle(this.props),
    masterOptions: this.props.options,
    filteredOptions: this.props.options,
    selectedOptions: [],
  };

  getId = id => {
    return id ? id.toLowerCase().replace(/ /g, '') : Math.random();
  };

  getLabelAttributes = value => {
    if (this.props.withCheckbox) {
      return {
        htmlFor: value,
        className: 'with-checkbox',
        style: { width: '100%' },
      };
    }
    return {
      className: 'non-checkbox',
    };
  };

  toggleListHandler = () => {
    this.setState(prevState => {
      if (prevState.showList) {
        return {
          showList: !prevState.showList,
          filteredOptions: prevState.masterOptions,
          searchText: '',
        };
      }
      return { showList: !prevState.showList };
    });
  };

  closeListHandler = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      this.setState(prevState => {
        return {
          showList: false,
          filteredOptions: prevState.masterOptions,
          searchText: '',
        };
      });
    }
  };

  searchHandler = e => {
    const {
      target: { value },
    } = e;
    let opts;
    if (!value) {
      opts = this.state.masterOptions;
    } else {
      opts = this.state.masterOptions.filter(opt =>
        opt.label
          .replace(/ /g, '')
          .toUpperCase()
          .includes(
            value
              .trim()
              .replace(/ /g, '')
              .toUpperCase(),
          ),
      );
    }
    this.setState({
      searchText: value,
      filteredOptions: opts,
    });
  };

  checkboxHandler = (e, opt) => {
    const { masterOptions } = this.state;
    const clonedMasterOptions = masterOptions.map(masterOpt => ({
      ...masterOpt,
    }));
    let selectedOpt = {};
    // handling "all" option
    if (opt.value === 'all') {
      clonedMasterOptions.forEach(opts => {
        opts.checked = e.target.checked;
      });
    } else {
      selectedOpt = clonedMasterOptions.find(mainOpt => {
        // Handling nested options
        if (mainOpt.options) {
          return mainOpt.options.some(
            nestedOpt => nestedOpt.value === opt.value,
          );
        }
        return mainOpt.value === opt.value;
      });
      // Handling nested options
      if (selectedOpt.options) {
        selectedOpt.options.forEach(nestedOpt => {
          if (nestedOpt.value === opt.value) {
            nestedOpt.checked = !nestedOpt.checked;
          }
        });
      } else {
        selectedOpt.checked = !selectedOpt.checked;
      }
    }
    this.setState(
      prevState => {
        return {
          searchText: '',
          masterOptions: clonedMasterOptions,
          filteredOptions: clonedMasterOptions,
          selectedOptions: selectedOpt.options
            ? // Handling nested options
              [
                ...prevState.selectedOptions.filter(
                  prevOpt => prevOpt.checked,
                ),
                ...selectedOpt.options.filter(
                  nestedOpt => nestedOpt.checked,
                ),
              ].filter(
                (v, i, a) =>
                  a.findIndex(
                    t => JSON.stringify(t) === JSON.stringify(v),
                  ) === i,
              )
            : clonedMasterOptions.filter(
                clonedOpt => clonedOpt.checked,
              ),
        };
      },
      () => {
        this.props.onChange(this.state.selectedOptions);
      },
    );
  };

  onClickHandler = opt => {
    this.setState(
      {
        searchText: '',
        showList: false,
        selectTitle: opt.label,
      },
      () =>
        this.props.onChange({
          target: {
            value: opt.value,
            name: this.props.name ? this.props.name : opt.label,
          },
        }),
    );
  };

  renderSearchBar = () => {
    const {
      state: { searchText },
      props: { name },
      getId,
      searchHandler,
    } = this;
    return (
      <div
        // className="search"
        style={{
          position: 'absolute',
          top: 0,
          width: '90%',
          bottom: 0,
          padding: '1%',
        }}
      >
        <input
          id={getId(name)}
          name="searchText"
          value={searchText}
          autoComplete="off"
          onChange={e => searchHandler(e)}
          style={{
            width: '100%',
            height: '100%',
            border: 'transparent',
            background: ' transparent',
            outline: 'none',
          }}
          // eslint-disable-next-line no-return-assign
          ref={el => (this.searchEl = el)}
        />
      </div>
    );
  };

  renderList = filteredOptions => {
    const {
      props: { withCheckbox, disabled, loader },
      getId,
      checkboxHandler,
      onClickHandler,
    } = this;
    if (filteredOptions.length === 0) {
      return (
        <li>
          {loader ? (
            <div className="spinner">
              <div className="bounce1" />
              <div className="bounce2" />
              <div className="bounce3" />
            </div>
          ) : (
            <label>No Options</label>
          )}
        </li>
      );
    }
    return filteredOptions.map(opt => {
      // Handling nested options
      if (opt.options) {
        return (
          <div style={{ padding: '0.325rem 0' }} key={opt.label}>
            <p
              style={{
                margin: '0.125rem 0',
                padding: '0 0.6125rem',
                fontSize: '0.650rem',
                color: '#a1a1a1',
                textTransform: 'uppercase',
              }}
            >
              {opt.label}
            </p>
            {this.renderList(opt.options)}
          </div>
        );
      }
      return (
        <li
          className="checkbox"
          key={opt.value}
          {...(!withCheckbox &&
            !disabled &&
            !opt.disabled && { onClick: () => onClickHandler(opt) })}
        >
          {/* <div className="vr-checkbox" style={{ width: '100%' }}> */}
          {withCheckbox && (
            <input
              id={opt.label.replace(' ', '_')}
              className={`check_${opt.code}`}
              type="checkbox"
              value={opt.value}
              checked={opt.checked ? opt.checked : false}
              onChange={e => checkboxHandler(e, opt)}
            />
          )}
          <label htmlFor={opt.label.replace(' ', '_')}>
            <i className="icon-ok-2" />
            {opt.label}
          </label>
          {/* <label {...this.getLabelAttributes(opt.value)}>
            {opt.label}
          </label> */}
          {/* </div> */}
        </li>
      );
    });
  };

  componentDidUpdate(prevProps) {
    if (this.searchEl) {
      this.searchEl.focus();
    }
    if (
      this.props.options !== prevProps.options ||
      JSON.stringify(this.props.options) !==
        JSON.stringify(prevProps.options)
    ) {
      this.setState({
        filteredOptions: this.props.options,
        masterOptions: this.props.options,
        selectTitle: this.getSelectTitle(this.props),
      });
    }
    if (this.props.name !== prevProps.name) {
      this.setState({
        selectTitle: this.getSelectTitle(this.props),
      });
    }
    if (this.props.value !== prevProps.value) {
      this.setState({
        selectTitle: this.getSelectTitle(this.props),
      });
    }
  }

  render() {
    const {
      state: { selectTitle, showList, searchText },
      props: { withSearchBar, style },
      toggleListHandler,
      closeListHandler,
    } = this;
    return (
      // <div
      //   className={`custom-select ${showList ? 'show-dropdown' : ''}`}
      //   onBlur={closeListHandler}
      //   tabIndex="1"
      //   style={{ outline: 'none' }}
      // >
      <div
        className="select-dropdown"
        // id="filter_dropdown_province"
        // tooltip={
        //   selectedProvinceName.length === 0
        //     ? ''
        //     : `${
        //         selectedProvinceName.length === allProvinceName.length
        //           ? 'All'
        //           : selectedProvinceName
        //       }`
        // }
        // flow="up"
      >
        <span
          className={`span-label ${showList ? 'span-active' : ''} `}
          onClick={toggleListHandler}
          onKeyDown={toggleListHandler}
          role="tab"
          tabIndex="-1"
        >
          {!searchText && selectTitle}
        </span>
        {showList && withSearchBar && this.renderSearchBar()}
        <ul
          className={`select-list ${showList ? 'active' : ''}`}
          id="dropdown-list"
          style={{ zIndex: '999' }}
        >
          {this.renderList(this.state.filteredOptions)}
        </ul>
      </div>
      //   <span
      //     className="selected-item"
      //     onClick={toggleListHandler}
      //     style={style}
      //   >
      //     {!searchText && selectTitle}
      //   </span>
      //   {showList && withSearchBar && this.renderSearchBar()}
      //   <ul className="select-dropdown  left-dropdown">
      //     {this.renderList(this.state.filteredOptions)}
      //   </ul>
      // </div>
    );
  }
}
export default Select;
