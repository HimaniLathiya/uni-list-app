import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { toastrService } from '../../services/toastr.service';
import { getAllUniversity } from '../../Utils/ApiUtil';




const columns = [
  { name: "University Name", selector: "name" },
  { name: 'Country', selector: "country" },
  { name: 'Website', selector: "domains" },
];

const Dashboard = ({ history }) => {
  const [loginLoading, setLoginLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
  const [uniList, setUniList] = useState([]);

  const fetchData = async () => {
    setLoginLoading(true);

    try {
      const resp = await getAllUniversity();
      if (resp) {
        setUniList(resp);
        setLoginLoading(false);
      } else {
        toastrService.error("Error occurred")
      }
      return [];
    } catch (err) {
      setLoginLoading(false);
      toastrService.error("Something went wrong");
    }
  };

  const handleSearchChange = async (text) => {
    await setSearchTerm(text)
    if (text.length === 0) {
      fetchData();
    }
  }
  const handleEmailChange = async (text) => {
    setEmail(text);
  }

  const handleSearch = async () => {
    if (searchTerm.length > 0) {
      const newData = uniList.filter((item) => {
        if (item.country.toLowerCase().includes(searchTerm.toLowerCase()) || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
          return item
      });
      setUniList(newData);
    } else {
      fetchData();
    }
  }

  const handleSubscribe = () => {
    var emails = JSON.parse(localStorage.getItem("emails"));
    if (!emails) {
      localStorage.setItem("emails", JSON.stringify([email]));
    } else {
      if (emails.includes(email)) {
        toastrService.error("You have already subscribe with this email");
      } else {
        emails.push(email)
        console.log("emails=>", emails)
        localStorage.setItem("emails", JSON.stringify([...emails]));
      }
    }
  }

  const goToLogIn = () => {
    history.push(`/login`)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={'logIn-text'} onClick={goToLogIn}>LogIn ?</div>
      <div className={'wrap-login-full wrap-content'}>
        <div className="search-menu">
          <input
            type="text"
            id="Search University"
            placeholder="Search University"
            name="s"
            onInput={(e) => handleSearchChange(e.target.value)}
          />
          <button type="submit" onClick={handleSearch}>Search</button>
        </div>
        {loginLoading && <div className={'logonFormLoader'}>&nbsp;</div>}
        {!loginLoading && (<>
          <div className="row">
            <div className="col-md-12"><h1>University List</h1></div>
          </div>
          <hr />
          {uniList && uniList.length > 0 &&
            (<DataTable striped bordered
              data={uniList}
              columns={columns}
              pagination
            />)}
        </>)}
        <div className="search-menu">
          <input
            type="text"
            id="Enter your email"
            placeholder="Enter your email"
            name="s"
            onInput={(e) => handleEmailChange(e.target.value)}
          />
          <button className={'subscribe-view'} type="submit" onClick={handleSubscribe}>Subscribe</button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
