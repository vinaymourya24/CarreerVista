import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEdit, FaCheck, FaTrash } from "react-icons/fa";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
    const [myJobs, setMyJobs] = useState([]);
    const [editingMode, setEditingMode] = useState(null);
    const { isAuthorized, user } = useContext(Context);
    const navigateTo = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/v1/job/getmyjobs",
                    { withCredentials: true }
                );
                setMyJobs(data.myJobs);
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch jobs");
                setMyJobs([]);
            }
        };
        fetchJobs();
    }, []);

    useEffect(() => {
        if (!isAuthorized || (user && user.role !== "Employer")) {
            navigateTo("/");
        }
    }, [isAuthorized, navigateTo, user]);

    const handleEnableEdit = (jobId) => {
        setEditingMode(jobId);
    };

    const handleDisableEdit = () => {
        setEditingMode(null);
    };

    const handleUpdateJob = async (jobId) => {
        try {
            const updatedJob = myJobs.find((job) => job._id === jobId);
            await axios.put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
                withCredentials: true,
            });
            toast.success("Job updated successfully");
            setEditingMode(null);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update job");
        }
    };

    const handleDeleteJob = async (jobId) => {
        try {
            await axios.delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
                withCredentials: true,
            });
            setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
            toast.success("Job deleted successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete job");
        }
    };

    const handleInputChange = (jobId, field, value) => {
        setMyJobs((prevJobs) =>
            prevJobs.map((job) =>
                job._id === jobId ? { ...job, [field]: value } : job
            )
        );
    };

    return (
        <div className="myJobs page">
            <div className="container">
                <h1>Your Posted Jobs</h1>
                {myJobs.length > 0 ? (
                    <div className="banner">
                        {myJobs.map((job) => (
                            <div className="card" key={job._id}>
                                <div className="content">
                                    <div className="short_fields">
                                        {/* Short fields inputs */}
                                    </div>
                                    <div className="long_field">
                                        {/* Long fields inputs */}
                                    </div>
                                </div>
                                <div className="button_wrapper">
                                    {editingMode === job._id ? (
                                        <>
                                            <button onClick={() => handleUpdateJob(job._id)}>
                                                <FaCheck /> Save
                                            </button>
                                            <button onClick={handleDisableEdit}>
                                                <FaTrash /> Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleEnableEdit(job._id)}>
                                            <FaEdit /> Edit
                                        </button>
                                    )}
                                    <button onClick={() => handleDeleteJob(job._id)}>
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>You haven't posted any jobs yet or you've deleted all your jobs.</p>
                )}
            </div>
        </div>
    );
};

export default MyJobs;
