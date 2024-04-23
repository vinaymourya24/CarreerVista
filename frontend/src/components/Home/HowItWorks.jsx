import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3> How CareerVista Site Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create an Account</p>
              <p>
                Sign up and create your personal or company profile to get started.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Explore Job Opportunities or Post a Job</p>
              <p>
                Browse through a wide range of job listings or post your own job openings.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply for Jobs or Recruit Suitable Candidates</p>
              <p>
                Apply to the jobs that match your skills and interests, or find the perfect candidate for your job postings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
