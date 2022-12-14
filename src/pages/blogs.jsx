import {useState, useEffect} from "react";
import {useSelector} from "react-redux";

import Axios from "axios";

import DocumentMeta from 'react-document-meta';

import {
    Container,
    Grid,
    CircularProgress,
    Box,
    Typography, Toolbar,
} from "@mui/material";

import BlogItem from "../components/blogitem";

const BlogsPage = () => {
    const [blogs, setBlogs] = useState(false);

    const env = useSelector(state => state.env);
    const backendAPI = env.REACT_APP_BACKEND_API;

    useEffect(() => {
        Axios.get(`${backendAPI}/blogs/all`)
            .then((result) => {
                setBlogs(result.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [blogs]);

    const theme = useSelector(state => state.theme);

    const meta = {
        title: "Read blogs",
        description: 'Every posted blog is now available here.',
        canonical: 'https://blog.amirhossein.info/blogs',
        meta: {
            charset: 'utf-8',
            name: {
            keywords: 'tfasoft,tfasoft blog,blog,tfa'
            }
        },
        link: {
            rel: { icon: "../assets/icons/favicon.ico" },
        },
    }

    return (
        <DocumentMeta {...meta}>
            <Container
                maxWidth="xl"
                sx={{
                    mb: "5rem",
                    background: `linear-gradient(to bottom, ${ theme === "light" ? "#071e4e" : "#222" } 60%, ${ theme === "light" ? "#f8f4fc" : "#333" } 40%)`,
                }}
            >
                <Toolbar />
                {
                    blogs
                    ?
                        <Container
                            sx={{
                                mt: "5rem",
                            }}
                        >
                            <Typography
                                variant="h2"
                                fontWeight="bold"
                                color="white"
                                gutterBottom
                            >
                                Featured posts
                            </Typography>
                            <Grid
                                spacing={3}
                                container
                            >
                                {
                                    blogs.reverse().map((blog) => {
                                        return (
                                            <Grid
                                                md={4}
                                                sm={6}
                                                xs={12}
                                                item
                                            >
                                                <BlogItem blog={blog} />
                                            </Grid>
                                        );
                                    })
                                }
                            </Grid>
                        </Container>
                    :
                        <Box
                            sx={{
                                textAlign: "center"
                            }}
                        >
                            <CircularProgress
                                sx={{
                                    mt: "3rem",
                                }}
                            />
                        </Box>
                }
            </Container>
        </DocumentMeta>
    );
}

export default BlogsPage;