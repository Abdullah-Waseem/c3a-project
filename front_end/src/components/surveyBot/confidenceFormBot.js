import React, { useState } from "react";
import PropTypes from "prop-types";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./surveyBot.css";
const theme = {
  background: "#f5f8fb",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#1686ec",
  headerFontColor: "#fff",
  headerFontSize: "25px",
  botBubbleColor: "#1686ec",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const Review = (props) => {
  const { steps } = props;

  let total = 0;
  total =
    steps.q1.value +
    steps.q2.value +
    steps.q3.value +
    steps.q4.value +
    steps.q5.value +
    steps.q6.value +
    steps.q7.value +
    steps.q8.value +
    steps.q9.value +
    steps.q10.value;

  let message;
  if (total <= 14) {
    message =
      "Your score indicates that your self-confidence can be an area of improvement.";
  } else if (total > 14 && total <= 25) {
    message =
      "Your scores indicate that your view about your self-worth lies within a healthy range. Keep it up!";
  } else {
    message =
      "You have a positive view of yourself. This essential strength can greatly assist you in maintaining your overall psychological well being";
  }

  return (
    <div style={{ width: "100%" }}>
      <p>{message}</p>
      {total <= 14 ? (
        <div>
          <p>
            Here's a list of things you can do to boost your self-confidence:{" "}
          </p>
          <p>Recognize your strengths </p>
          <p>Be kind to yourself </p>
          <p>Surround yourself with people who bring out the best in you</p>
          <p>Celebrate your wins</p>
        </div>
      ) : null}
      {total <= 14 ? (
        <div>
          <p>
            We all have times when we do not feel good about ourselves. However,
            when you struggle with self-confidence persists, it can affect your
            mental health. In such case, please consult the referral list{" "}
            <a href="https://c3a.nust.edu.pk/counselling-services/for-appointment/for-appointment/">
              here
            </a>{" "}
            to explore this concern with a professional psychologist.
          </p>
        </div>
      ) : null}
    </div>
  );
};

Review.propTypes = {
  steps: PropTypes.object,
};

const ConfidenceFormBot = (props) => {
  const { id, name, email, comments } = props;
  const [totalScore, setTotalScore] = useState(0);

  const handleReview = (steps) => {
    console.log("steps", steps);
    let total = 0;
    for (let i = 0; i < steps.values.length; i++) {
      total += steps.values[i];
    }

    if (total > 5) {
      // Send email logic here
      const params = new URLSearchParams({
        subject: "High Self Esteem Score Alert",
        body: "Please visit C3A department.",
        to: email, // Change to the actual recipient email
      });
      const url = `https://localhost:7013/api/Emaill?${params.toString()}`;
      axios
        .post(url)
        .then((response) => {
          console.log("Email sent successfully");
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
      // console.log("total", total);
    }

    console.log("total", total);
    setTotalScore(total);
    updateData(id, name, email, comments, total);
  };

  console.log("totalScore", totalScore);
  console.log("id", id);
  console.log("name", name);
  console.log("email", email);
  console.log("comments", comments);

  const updateData = (id, name, email, comments, total) => {
    const url = `https://localhost:7013/api/Users/${id}`;
    const data = {
      name: name,
      email: email,
      comments: "",
      selfesteem_Score: total,
      clientOfC3A: "",
      email_Sent: total > 5 ? "Yes" : "No",
    };
    axios
      .put(url, data)
      .then((response) => {
        // getData();
        // clear();
        toast.success("Data updated successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div style={{ zoom: 1.25 }}>
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="Self Esteem Form Bot"
          className="custom-chatbot"
          hideUserInput={true}
          handleEnd={(steps) => handleReview(steps)}
          headerDelay={0}
          userDelay={0}
          botDelay={500}
          typingSpeed={100}
          steps={[
            {
              id: "1",
              message:
                "This is a screening tool for basic measurement of the nature and intensity of your concerns. Please note that this information is not diagnosis but merely there to guide if professional help is required. Please consider these scores according.",
              trigger: "2",
            },
            {
              id: "2",
              message:
                "In each question, please select one of the following options",
              trigger: "3",
            },
            {
              id: "3",
              message:
                "I feel that I am a person of worth, at least on an equal plane with others.",
              trigger: "q1",
            },
            {
              id: "q1",
              options: [
                { value: 3, label: "Strongly Agree", trigger: "5" },
                { value: 2, label: "Agree", trigger: "5" },
                { value: 1, label: "Disagree", trigger: "5" },
                { value: 0, label: "Strongly Disagree", trigger: "5" },
              ],
            },
            {
              id: "5",
              message: "I feel that I have a number of good qualities.",
              trigger: "q2",
            },
            {
              id: "q2",
              options: [
                { value: 3, label: "Strongly Agree", trigger: "7" },
                { value: 2, label: "Agree", trigger: "7" },
                { value: 1, label: "Disagree", trigger: "7" },
                { value: 0, label: "Strongly Disagree", trigger: "7" },
              ],
            },
            {
              id: "7",
              message: "All in all, I am inclined to feel that I am a failure.",
              trigger: "q3",
            },
            {
              id: "q3",
              options: [
                { value: 0, label: "Strongly Agree", trigger: "9" },
                { value: 1, label: "Agree", trigger: "9" },
                { value: 2, label: "Disagree", trigger: "9" },
                { value: 3, label: "Strongly Disagree", trigger: "9" },
              ],
            },
            {
              id: "9",
              message: "I am able to do things as well as most other people.",
              trigger: "q4",
            },
            {
              id: "q4",
              options: [
                { value: 3, label: "Strongly Agree", trigger: "11" },
                { value: 2, label: "Agree", trigger: "11" },
                { value: 1, label: "Disagree", trigger: "11" },
                { value: 0, label: "Strongly Disagree", trigger: "11" },
              ],
            },
            {
              id: "11",
              message: "I feel I do not have much to be proud of.",
              trigger: "q5",
            },
            {
              id: "q5",
              options: [
                { value: 0, label: "Strongly Agree", trigger: "13" },
                { value: 1, label: "Agree", trigger: "13" },
                { value: 2, label: "Disagree", trigger: "13" },
                { value: 3, label: "Strongly Disagree", trigger: "13" },
              ],
            },
            {
              id: "13",
              message: "I take a positive attitude toward myself.",
              trigger: "q6",
            },
            {
              id: "q6",
              options: [
                { value: 3, label: "Strongly Agree", trigger: "15" },
                { value: 2, label: "Agree", trigger: "15" },
                { value: 1, label: "Disagree", trigger: "15" },
                { value: 0, label: "Strongly Disagree", trigger: "15" },
              ],
            },
            {
              id: "15",
              message: "On the whole, I am satisfied with myself",
              trigger: "q7",
            },
            {
              id: "q7",
              options: [
                { value: 3, label: "Strongly Agree", trigger: "17" },
                { value: 2, label: "Agree", trigger: "17" },
                { value: 1, label: "Disagree", trigger: "17" },
                { value: 0, label: "Strongly Disagree", trigger: "17" },
              ],
            },
            {
              id: "17",
              message: "I wish I could have more respect for myself",
              trigger: "q8",
            },
            {
              id: "q8",
              options: [
                { value: 0, label: "Strongly Agree", trigger: "19" },
                { value: 1, label: "Agree", trigger: "19" },
                { value: 2, label: "Disagree", trigger: "19" },
                { value: 3, label: "Strongly Disagree", trigger: "19" },
              ],
            },
            {
              id: "19",
              message: "I certainly feel useless at times.",
              trigger: "q9",
            },
            {
              id: "q9",
              options: [
                { value: 0, label: "Strongly Agree", trigger: "21" },
                { value: 1, label: "Agree", trigger: "21" },
                { value: 2, label: "Disagree", trigger: "21" },
                { value: 3, label: "Strongly Disagree", trigger: "21" },
              ],
            },
            {
              id: "21",
              message: "At times I think I am no good at all.",
              trigger: "q10",
            },
            {
              id: "q10",
              options: [
                { value: 0, label: "Strongly Agree", trigger: "23" },
                { value: 1, label: "Agree", trigger: "23" },
                { value: 2, label: "Disagree", trigger: "23" },
                { value: 3, label: "Strongly Disagree", trigger: "23" },
              ],
            },
            {
              id: "23",
              message: "Thank you for your submission of Form",
              trigger: "review",
            },

            {
              id: "review",
              component: <Review />,
              asMessage: true,
              end: true,
            },
          ]}
          style={{ width: "100%", height: "100%" }}
        />
      </ThemeProvider>
    </div>
  );
};

export default ConfidenceFormBot;
