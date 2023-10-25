import "./style.scss";
import React from 'react';
import { Button, Dropdown as AntDropdown } from 'antd';

class  Dropdown extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    renderMenu = (data, selected, callback) => {
        if(!data || !Array.isArray(data) || !data.length) {
            return <></>;
        }
        let menuComponent = [];
        for(let i in data) {
            if(!data[i] || !data[i].key || !data[i].label) {
                continue
            }
            if(data[i].key === selected) {
                continue
            }
            menuComponent.push({
                key: data[i].key,
                label: (
                    <a id="dropdown-menu-item" onClick={() => callback(data[i])}>
                        {data[i].label}
                    </a>
                )
            })
        }

        if(!menuComponent || !Array.isArray(menuComponent) || !menuComponent.length) {
            return <></>
        }
        return menuComponent;
    }

    render() {

        const { data, selected, callback } = this.props;

        let selectedOption = data && data.find(item => item.key === selected);
        if(!selectedOption || !Object.keys(selectedOption).length) {
            selectedOption = data && Array.isArray(data) && data.length ? data[0] : {};
            selected = selectedOption.key;
        }

        return(
            <AntDropdown
                menu={{items: this.renderMenu(data, selected, callback)}}
                placement="bottom"
                arrow={{
                pointAtCenter: true,
                }}
            >
                <Button className='dropdown-button-style'>{(selectedOption && selectedOption.label) || ""}</Button>
            </AntDropdown>
        )
    }
};
export default Dropdown;