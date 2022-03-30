import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

function SingleContent(props) {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 7,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [countResults, setCountResults] = useState("");

    useEffect(() => {
        FetchTrending();
    }, []);

    useEffect(() => { }, [page]);

    const FetchTrending = async () => {
        try {
            const trendingData = await fetch("http://localhost:8000/api/products");
            const response = await trendingData.json();
            console.log("result", response);
            setContent(response);
        } catch (errors) {
            console.log("err", errors);
        }
    };

    console.log("props cc", props);

    return (
        <div className="mt-3 card-product1 rounded mb-5 text-left">
            <h5 className="mt-2 mb-2">Trending Products</h5>
            <hr />
            <Carousel
                swipeable={false}
                draggable={false}
                // showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                // autoPlay={props.deviceType !== "mobile" ? true : false}
                autoPlay={true}
                // autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                deviceType={props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {content.map((c) => {
                    return (
                        <div className="" key={c.id}>
                            <div className="text-center mr-2">
                                <Link to={`/user/product/${c._id}`}>
                                    <img
                                        src={`http://localhost:8000/api/product/photo/${c._id}`}
                                        alt={c.title}
                                        height="250px"
                                        width="180px"
                                        className=""
                                        style={{ borderRadius: "10px" }}
                                    />
                                    <h6 className="mt-1">
                                        <b>{c.name}</b>
                                    </h6>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </Carousel>
        </div>
    );
}

export default SingleContent;
