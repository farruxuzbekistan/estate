import { Button, Input, Textarea, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../constants/scrollToTop";

const Footer = () => {
  const toast = useToast();
  const [btnLoader, setBtnLoader] = useState(false);
  const currentYear = new Date().getFullYear(); // Get the current year

  const showToast = () => {
    toast({
      title: "Message Sent",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
      containerStyle: {
        zIndex: 9999,
      },
    });
  };

  const errorToast = (message, status) => {
    toast({
      title: message,
      status: status,
      duration: 2000,
      isClosable: true,
      position: "top",
      containerStyle: {
        zIndex: 9999,
      },
    });
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    const errors = validateForm(formData);

    if (!errors) {
      setBtnLoader(true);
      axios
        .post("https://homyz-server.vercel.app/contact", formData)
        .then(() => {
          showToast();
          setFormData({
            firstName: "",
            lastName: "",
            phoneNo: "",
            email: "",
            message: "",
          });
          setBtnLoader(false);
        })
        .catch((error) => {
          setBtnLoader(false);
          errorToast(error.message, "error");
        });
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateForm = (data) => {
    let _error = false;
    if (
      !data.firstName ||
      !data.firstName.trim() ||
      !data.lastName ||
      !data.lastName.trim() ||
      !data.email ||
      !isValidEmail(data.email) ||
      !data.phoneNo ||
      !data.message ||
      !data.message.trim()
    ) {
      errorToast("Please fill in all fields correctly!", "error");
      _error = true;
    }
    return _error;
  };

  return (
    <div className="bg-black">
      <footer
        style={{ maxWidth: 1200 }}
        className="mx-auto flex justify-between gap-20 max-lg:flex-col py-20 px-8 max-sm:px-5"
      >
        {/* Left side: logo, text, links */}
        <div className="flex flex-col items-start justify-between gap-16 w-2/4 max-lg:w-full pr-10 max-sm:pr-0">
          <div className="flex flex-col text-lg items-start justify-between gap-10">
            <a href="/">
              <img src="/Homyz-logo.png" className="w-36" alt="Homyz-logo" />
            </a>
            <p style={{ color: "#696969" }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam,
              pariatur. Fugit dignissimos aut tempora ullam similique minima
              culpa quod fuga, doloribus expedita, cupiditate sint, nulla
              distinctio soluta. Aut, sequi quia.
            </p>
            <div className="flex text-xl justify-start items-center gap-10 text-red-500">
              <Link target="_blank" to="https://facebook.com">
                <FaFacebookF />
              </Link>
              <Link target="_blank" to="https://instagram.com">
                <FaInstagram />
              </Link>
              <Link target="_blank" to="https://twitter.com">
                <FaTwitter />
              </Link>
            </div>
            <ul className="text-white text-lg flex justify-start items-center flex-wrap gap-x-8 gap-y-4">
              <Link
                onClick={scrollToTop}
                className="hover:text-red-500 transition-all"
                to="/"
              >
                Home
              </Link>
              <Link
                onClick={scrollToTop}
                className="hover:text-red-500 transition-all"
                to="/services"
              >
                Services
              </Link>
              <Link
                onClick={scrollToTop}
                className="hover:text-red-500 transition-all"
                to="/about"
              >
                About Us
              </Link>
              <Link
                onClick={scrollToTop}
                className="hover:text-red-500 transition-all"
                to="/contact"
              >
                Contact Us
              </Link>
            </ul>
          </div>
          <p style={{ color: "#696969" }}>
            © Homyz. All Rights Reserved {currentYear}.
          </p>
          <p className="text-white">
            Developed by{" "}
            <a
              href="https://www.youtube.com/@FarruxDeveloper"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-white transition-all"
            >
              Farrux Developer
            </a>
          </p>
        </div>

        {/* Right side: contact form */}
        <div
          id="contact"
          className="w-2/4 max-lg:w-full flex flex-col h-auto justify-between items-start gap-10"
        >
          <h1 className="text-3xl text-white">Get in Touch</h1>
          <div className="name w-full gap-8 text-white max-sm:flex-col max-sm:gap-10 mt-3 flex">
            <Input
              pl={3}
              fontSize={19}
              variant="flushed"
              borderColor="#696969"
              focusBorderColor="white"
              _placeholder={{ color: "#696969" }}
              placeholder="First Name"
              name="firstName"
              maxLength={20}
              value={formData.firstName}
              onChange={handleChange}
              autoComplete="off"
            />
            <Input
              pl={3}
              fontSize={19}
              variant="flushed"
              borderColor="#696969"
              focusBorderColor="white"
              _placeholder={{ color: "#696969" }}
              placeholder="Last Name"
              name="lastName"
              maxLength={20}
              value={formData.lastName}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="contact w-full text-white gap-8 max-sm:flex-col max-sm:gap-10 flex">
            <Input
              pl={3}
              fontSize={19}
              variant="flushed"
              borderColor="#696969"
              focusBorderColor="white"
              _placeholder={{ color: "#696969" }}
              placeholder="Email Address"
              name="email"
              maxLength={40}
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
            />
            <Input
              pl={3}
              fontSize={19}
              variant="flushed"
              borderColor="#696969"
              focusBorderColor="white"
              _placeholder={{ color: "#696969" }}
              type="number"
              placeholder="Phone No"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              autoComplete="off"
              max={15}
              maxLength={15}
            />
          </div>
          <Textarea
            pl={3}
            fontSize={19}
            variant="flushed"
            borderColor="#696969"
            focusBorderColor="white"
            _placeholder={{ color: "#696969" }}
            placeholder="Message"
            maxLength={200}
            className="w-full text-white"
            name="message"
            value={formData.message}
            onChange={handleChange}
            autoComplete="off"
          />
          <Button
            _hover={{ backgroundColor: "white", color: "#d5515e" }}
            backgroundColor="#d5515e"
            color="white"
            borderColor="#d5515e"
            variant="outline"
            size="lg"
            isLoading={btnLoader}
            loadingText="Sending.."
            onClick={handleSubmit}
            className="mt-4 max-lg:w-72 max-sm:w-full"
            transitionDuration="300ms"
            fontWeight="normal"
            fontSize="20px"
            borderRadius="4px"
          >
            Submit
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
