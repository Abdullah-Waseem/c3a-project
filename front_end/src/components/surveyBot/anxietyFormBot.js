import React, { useState } from "react";
import PropTypes from "prop-types";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import "./surveyBot.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    // steps.q6.value +
    // steps.q7.value +
    // steps.q8.value +
    // steps.q9.value +
    // steps.q10.value +
    // steps.q11.value +
    // steps.q12.value +
    // steps.q13.value +
    // steps.q14.value +
    // steps.q15.value +
    // steps.q16.value +
    // steps.q17.value +
    // steps.q18.value +
    // steps.q19.value +
    // steps.q20.value +
    steps.q21.value;

  let message;
  if (total < 11) {
    message =
      "Your scores suggest that you have a healthy state of mind. Chill and enjoy life.";
  } else if (total >= 11 && total <= 21) {
    message =
      "Your score represents low levels of Anxiety. Try to regulate your day-to-day routine. Get enough rest. Keep yourself hydrated. Sleep well. And reach out to your friends for support.";
  } else if (total > 21 && total < 36) {
    message =
      "Your scores indicate elevated level of anxiety. This might be affecting your day-to-day activities. It is important to surround yourself with supportive friends/family when things become too overwhelming. It is also recommended that you may seek counselling by dropping an email at c3a@nust.edu.pk or calling at 051-90851579";
  } else {
    message =
      "Your scores indicate potentially concerning levels of anxiety. It is important to understand that these concerns are manageable and it is advised that you seek professional help at the earliest. You may email NUST's counselling services at c3a@nust.edu.pk or call at 051-90851579. ";
  }

  return (
    <div style={{ width: "100%" }}>
      <p>{message}</p>
      {total >= 11 && total <= 20 ? (
        <div>
          <p>Also Here are a list of activities to make yourself feel better</p>
          <p>Walk</p>
          <p>Deep Breathing</p>
          <p>Mindfulness Meditation</p>
        </div>
      ) : null}
      {total >= 21 ? (
        <div>
          <p>
            You can also click{" "}
            <a
              href="https://c3a.nust.edu.pk/counselling-services/for-appointment/for-appointment/"
              target="_blank"
              rel="noreferrer noopener"
            >
              here
            </a>{" "}
            to set an appointment
          </p>
        </div>
      ) : null}
    </div>
  );
};

Review.propTypes = {
  steps: PropTypes.object,
};

const AnxietyFormBot = (props) => {
  const { id, name, email, comments } = props;

  const [totalScore, setTotalScore] = useState(0);

  const handleReview = (steps) => {
    let total = 0;
    for (let i = 0; i < steps.values.length; i++) {
      total += steps.values[i];
    }
    if (total > 5) {
      // Send email logic here
      const params = new URLSearchParams({
        subject: "High Anxiety Score Alert",
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
    setTotalScore(total);
    updateData(id, name, email, comments, total);
  };

  console.log("totalScore", totalScore);
  console.log("id", id);
  console.log("name", name);
  console.log("email", email);

  const updateData = (id, name, email, comments, total) => {
    const url = `https://localhost:7013/api/Users/${id}`;
    const data = {
      name: name,
      email: email,
      comments: "",
      anxiety_Score: total,
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
          headerTitle="Anxiety Screening Bot"
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
                "This is a screening tool for basic measurement of the nature and intensity of your concerns. Please note that this information is not diagnosis but merely there to guide if professional help is required. Please consider these scores accordingly.",
              trigger: "2",
            },
            {
              id: "2",
              message:
                "Please select one of the following options based on how much you have been bothered by these concerns during the past month",
              trigger: "3",
            },
            {
              id: "3",
              message: "Numbness or tingling",
              trigger: "q1",
            },
            {
              id: "q1",
              options: [
                { value: 0, label: "Not at all", trigger: "5" },
                {
                  value: 1,
                  label: "Mildly, but it didnt bother me much",
                  trigger: "5",
                },
                {
                  value: 2,
                  label: "Moderately - it wasnt pleasant at times",
                  trigger: "5",
                },
                {
                  value: 3,
                  label: "Severely - it bothered me a lot",
                  trigger: "5",
                },
              ],
            },
            {
              id: "5",
              message: "Feeling hot",
              trigger: "q2",
            },
            {
              id: "q2",
              options: [
                { value: 0, label: "Not at all", trigger: "7" },
                {
                  value: 1,
                  label: "Mildly, but it didnt bother me much",
                  trigger: "7",
                },
                {
                  value: 2,
                  label: "Moderately - it wasnt pleasant at times",
                  trigger: "7",
                },
                {
                  value: 3,
                  label: "Severely - it bothered me a lot",
                  trigger: "7",
                },
              ],
            },
            {
              id: "7",
              message: "Wobbliness in legs",
              trigger: "q3",
            },
            {
              id: "q3",
              options: [
                { value: 0, label: "Not at all", trigger: "9" },
                {
                  value: 1,
                  label: "Mildly, but it didnt bother me much",
                  trigger: "9",
                },
                {
                  value: 2,
                  label: "Moderately - it wasnt pleasant at times",
                  trigger: "9",
                },
                {
                  value: 3,
                  label: "Severely - it bothered me a lot",
                  trigger: "9",
                },
              ],
            },
            {
              id: "9",
              message: "Unable to relax",
              trigger: "q4",
            },
            {
              id: "q4",
              options: [
                { value: 0, label: "Not at all", trigger: "11" },
                {
                  value: 1,
                  label: "Mildly, but it didnt bother me much",
                  trigger: "11",
                },
                {
                  value: 2,
                  label: "Moderately - it wasnt pleasant at times",
                  trigger: "11",
                },
                {
                  value: 3,
                  label: "Severely - it bothered me a lot",
                  trigger: "11",
                },
              ],
            },
            {
              id: "11",
              message: "Fear of worst happening",
              trigger: "q5",
            },
            {
              id: "q5",
              options: [
                { value: 0, label: "Not at all", trigger: "43" },
                {
                  value: 1,
                  label: "Mildly, but it didnt bother me much",
                  trigger: "43",
                },
                {
                  value: 2,
                  label: "Moderately - it wasnt pleasant at times",
                  trigger: "43",
                },
                {
                  value: 3,
                  label: "Severely - it bothered me a lot",
                  trigger: "43",
                },
              ],
            },
            // {
            //   id: "13",
            //   message: "Dizzy or lightheaded",
            //   trigger: "q6",
            // },
            // {
            //   id: "q6",
            //   options: [
            //     { value: 0, label: "Not at all", trigger: "15" },
            //     {
            //       value: 1,
            //       label: "Mildly, but it didnt bother me much",
            //       trigger: "15",
            //     },
            //     {
            //       value: 2,
            //       label: "Moderately - it wasnt pleasant at times",
            //       trigger: "15",
            //     },
            //     {
            //       value: 3,
            //       label: "Severely - it bothered me a lot",
            //       trigger: "15",
            //     },
            //   ],
            // },
            // {
            //   id: "15",
            //   message: "Heart pounding / racing",
            //   trigger: "q7",
            // },
            // {
            //   id: "q7",
            //   options: [
            //     { value: 0, label: "Not at all", trigger: "17" },
            //     {
            //       value: 1,
            //       label: "Mildly, but it didnt bother me much",
            //       trigger: "17",
            //     },
            //     {
            //       value: 2,
            //       label: "Moderately - it wasnt pleasant at times",
            //       trigger: "17",
            //     },
            //     {
            //       value: 3,
            //       label: "Severely - it bothered me a lot",
            //       trigger: "17",
            //     },
            //   ],
            // },
            // {
            //   id: "17",
            //   message: "Unsteady",
            //   trigger: "q8",
            // },
            // {
            //   id: "q8",
            //   options: [
            //     { value: 0, label: "Not at all", trigger: "19" },
            //     {
            //       value: 1,
            //       label: "Mildly, but it didnt bother me much",
            //       trigger: "19",
            //     },
            //     {
            //       value: 2,
            //       label: "Moderately - it wasnt pleasant at times",
            //       trigger: "19",
            //     },
            //     {
            //       value: 3,
            //       label: "Severely - it bothered me a lot",
            //       trigger: "19",
            //     },
            //   ],
            // },
            // {
            //   id: "19",
            //   message: "Terrified or afraid",
            //   trigger: "q9",
            // },
            // {
            //   id: "q9",
            //   options: [
            //     { value: 0, label: "Not at all", trigger: "21" },
            //     {
            //       value: 1,
            //       label: "Mildly, but it didnt bother me much",
            //       trigger: "21",
            //     },
            //     {
            //       value: 2,
            //       label: "Moderately - it wasnt pleasant at times",
            //       trigger: "21",
            //     },
            //     {
            //       value: 3,
            //       label: "Severely - it bothered me a lot",
            //       trigger: "21",
            //     },
            //   ],
            // },
            // {
            //   id: "21",
            //   message: "Nervous",
            //   trigger: "q10",
            // },
            // {
            //   id: "q10",
            //   options: [
            //     { value: 0, label: "Not at all", trigger: "23" },
            //     {
            //       value: 1,
            //       label: "Mildly, but it didnt bother me much",
            //       trigger: "23",
            //     },
            //     {
            //       value: 2,
            //       label: "Moderately - it wasnt pleasant at times",
            //       trigger: "23",
            //     },
            //     {
            //       value: 3,
            //       label: "Severely - it bothered me a lot",
            //       trigger: "23",
            //     },
            //   ],
            // },
            // {
            //   id: "23",
            //   message: "Feeling of choking",
            //   trigger: "q11",
            // },
            // {
            //   id: "q11",
            //   options: [
            //     { value: 0, label: "Not at all", trigger: "25" },
            //     {
            //       value: 1,
            //       label: "Mildly, but it didnt bother me much",
            //       trigger: "25",
            //     },
            //     {
            //       value: 2,
            //       label: "Moderately - it wasnt pleasant at times",
            //       trigger: "25",
            //     },
            //     {
            //       value: 3,
            //       label: "Severely - it bothered me a lot",
            //       trigger: "25",
            //     },
            //   ],
            // },
            // {
            //   id: "25",
            //   message: "Hands trembling",
            //   trigger: "q12",
            // },
            // {
            //   id: "q12",
            //   options: [
            //     { value: 0, label: "Not at all", trigger: "27" },
            //     {
            //       value: 1,
            //       label: "Mildly, but it didnt bother me much",
            //       trigger: "27",
            //     },
            //     {
            //       value: 2,
            //       label: "Moderately - it wasnt pleasant at times",
            //       trigger: "27",
            //     },
            //     {
            //       value: 3,
            //       label: "Severely - it bothered me a lot",
            //       trigger: "27",
            //     },
            //   ],
            // },
            // {
            //   id: "27",
            //   message: "Shaky / unsteady",
            //   trigger: "q13",
            // },
            // {
            //   id: "q13",
            //   options: [
            //     { value: 0, label: "Not at all", trigger: "29" },
            //     {
            //       value: 1,
            //       label: "Mildly, but it didnt bother me much",
            //       trigger: "29",
            //     },
            //     {
            //       value: 2,
            //       label: "Moderately - it wasnt pleasant at times",
            //       trigger: "29",
            //     },
            //     {
            //       value: 3,
            //       label: "Severely - it bothered me a lot",
            //       trigger: "29",
            //     },
            //   ],
            // },
            // {
            //   id: "29",
            //   message: "Fear of losing control",
            //   trigger: "q14",
            // },
            // {
            //   id: "q14",
            //   options: [
            //     { value: 0, label: "Not at all", trigger: "31" },
            //     {
            //       value: 1,
            //       label: "Mildly, but it didnt bother me much",
            //       trigger: "31",
            //     },
            //     {
            //       value: 2,
            //       label: "Moderately - it wasnt pleasant at times",
            //       trigger: "31",
            //     },
            //     {
            //       value: 3,
            //       label: "Severely - it bothered me a lot",
            //       trigger: "31",
            //     },
            //   ],
            // },
            // {
            //   id: "31",
            //   message: "Difficulty in breathing",
            //   trigger: "q15",
            // },
            // {
            //   id: "q15",
            //   options: [
            //     { value: 0, label: "Not at all", trigger: "33" },
            //     {
            //       value: 1,
            //       label: "Mildly, but it didnt bother me much",
            //       trigger: "33",
            //     },
            //     {
            //       value: 2,
            //       label: "Moderately - it wasnt pleasant at times",
            //       trigger: "33",
            //     },
            //     {
            //       value: 3,
            //       label: "Severely - it bothered me a lot",
            //       trigger: "33",
            //     },
            //   ],
            // },
            // {
            //   id: "33",
            //   message: "Fear of dying",
            //   trigger: "q16",
            // },
            // {
            //   id: "q16",
            //   options: [
            //     { value: 0, label: "Not at all", trigger: "35" },
            //     {
            //       value: 1,
            //       label: "Mildly, but it didnt bother me much",
            //       trigger: "35",
            //     },
            //     {
            //       value: 2,
            //       label: "Moderately - it wasnt pleasant at times",
            //       trigger: "35",
            //     },
            //     {
            //       value: 3,
            //       label: "Severely - it bothered me a lot",
            //       trigger: "35",
            //     },
            //   ],
            // },
            // {
            //   id: "35",
            //   message: "Scared",
            //   trigger: "q17",
            // },
            // {
            //   id: "q17",
            //   options: [
            //     { value: 0, label: "Not at all", trigger: "37" },
            //     {
            //       value: 1,
            //       label: "Mildly, but it didnt bother me much",
            //       trigger: "37",
            //     },
            //     {
            //       value: 2,
            //       label: "Moderately - it wasnt pleasant at times",
            //       trigger: "37",
            //     },
            //     {
            //       value: 3,
            //       label: "Severely - it bothered me a lot",
            //       trigger: "37",
            //     },
            //   ],
            // },
            // {
            //   id: "37",
            //   message: "Indigestion",
            //   trigger: "q18",
            // },
            // {
            //   id: "q18",
            //   options: [
            //     { value: 0, label: "Not at all", trigger: "39" },
            //     {
            //       value: 1,
            //       label: "Mildly, but it didnt bother me much",
            //       trigger: "39",
            //     },
            //     {
            //       value: 2,
            //       label: "Moderately - it wasnt pleasant at times",
            //       trigger: "39",
            //     },
            //     {
            //       value: 3,
            //       label: "Severely - it bothered me a lot",
            //       trigger: "39",
            //     },
            //   ],
            // },
            // {
            //   id: "39",
            //   message: "Faint / lightheaded",
            //   trigger: "q19",
            // },
            // {
            //   id: "q19",
            //   options: [
            //     { value: 0, label: "Not at all", trigger: "41" },
            //     {
            //       value: 1,
            //       label: "Mildly, but it didnt bother me much",
            //       trigger: "41",
            //     },
            //     {
            //       value: 2,
            //       label: "Moderately - it wasnt pleasant at times",
            //       trigger: "41",
            //     },
            //     {
            //       value: 3,
            //       label: "Severely - it bothered me a lot",
            //       trigger: "41",
            //     },
            //   ],
            // },
            // {
            //   id: "41",
            //   message: "Face flushed",
            //   trigger: "q20",
            // },
            // {
            //   id: "q20",
            //   options: [
            //     { value: 0, label: "Not at all", trigger: "43" },
            //     {
            //       value: 1,
            //       label: "Mildly, but it didnt bother me much",
            //       trigger: "43",
            //     },
            //     {
            //       value: 2,
            //       label: "Moderately - it wasnt pleasant at times",
            //       trigger: "43",
            //     },
            //     {
            //       value: 3,
            //       label: "Severely - it bothered me a lot",
            //       trigger: "43",
            //     },
            //   ],
            // },
            {
              id: "43",
              message: "Hot / cold sweat",
              trigger: "q21",
            },
            {
              id: "q21",
              options: [
                { value: 0, label: "Not at all", trigger: "45" },
                {
                  value: 1,
                  label: "Mildly, but it didnt bother me much",
                  trigger: "45",
                },
                {
                  value: 2,
                  label: "Moderately - it wasnt pleasant at times",
                  trigger: "45",
                },
                {
                  value: 3,
                  label: "Severely - it bothered me a lot",
                  trigger: "45",
                },
              ],
            },
            {
              id: "45",
              message: "Thank you for your submission of Anxiety Form",
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

export default AnxietyFormBot;
