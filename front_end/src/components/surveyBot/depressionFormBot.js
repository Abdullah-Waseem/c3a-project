import React, { useState } from "react";
import PropTypes from "prop-types";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import "./surveyBot.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMyContext } from "../../MyContext"; // Import the context hook

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
    steps.q10.value +
    steps.q11.value +
    steps.q12.value +
    steps.q13.value +
    steps.q14.value +
    steps.q15.value +
    steps.q16.value +
    steps.q17.value +
    steps.q18.value +
    steps.q19.value +
    steps.q20.value +
    steps.q21.value;

  let message;

  if (total <= 10) {
    message = "Your scores suggest that you have a healthy state of mind.";
  } else if (total > 10 && total < 16) {
    message =
      "Your score represents low levels of Depression. Try to regulate your day-to-day routine. Get enough rest. Keep yourself hydrated. Sleep well. And reach out to your friends for support.";
  } else if (total >= 16 && total < 21) {
    message =
      "Your score represents low levels of Depression. Try to regulate your day-to-day routine. Get enough rest. Keep yourself hydrated. Sleep well. And reach out to your friends for support.";
  } else if (total >= 21 && total < 31) {
    message =
      "Your scores indicate elevated level of Depression. This might be affecting your day-to-day activities. It is important to surround yourself with supportive friends/family when things become too overwhelming. It is also recommended that you may seek counselling by dropping an email at c3a@nust.edu.pk or calling at 051-90851579";
  } else if (total >= 31 && total < 41) {
    message =
      "Your scores indicate potentially concerning levels of Depression. It is important to understand that these concerns are manageable and it is advised that you seek professional help at the earliest. You may email NUST's counselling services at c3a@nust.edu.pk or call at 051-90851579.";
  } else {
    message =
      "Your scores indicate potentially concerning levels of Depression. It is important to understand that these concerns are manageable and it is advised that you seek professional help at the earliest. You may email NUST's counselling services at c3a@nust.edu.pk or call at 051-90851579. ";
  }

  return (
    <div style={{ width: "100%" }}>
      <p>{message}</p>
      {total >= 11 && total <= 20 ? (
        <div>
          <p>Here are a list of activities to make yourself feel better</p>
          <p>Write in a journal</p>
          <p>Watch a movie</p>
          <p>Draw or paint</p>
          <p>Play an instrument</p>
          <p>Play a sport</p>
          <p>Go for a walk</p>
          <p>Meditate</p>
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

const DepressionFormBot = (props) => {
  const { id, name, email, comments } = props;
  const [totalScore, setTotalScore] = useState(0);
  const { token } = useMyContext();
  console.log("token", token);
  const handleReview = (steps) => {
    let total = 0;
    for (let i = 0; i < steps.values.length; i++) {
      total += steps.values[i];
    }

    if (total > 28) {
      // Send email logic here
      const params = new URLSearchParams({
        subject: "High Depression Score Alert",
        body: "Please visit C3A department.",
        to: email, // Change to the actual recipient email
      });
      const url = `https://localhost:7013/api/Emaill?${params.toString()}`;
      axios
        .post(
          url,
          {},
          {
            headers: {
              token: token, // Include the token in the Authorization header
            },
          }
        )
        .then((response) => {
          console.log("email response", response);
        })
        .catch((error) => {
          console.log("Error sending email:", error.response);
        });
      //
    }

    setTotalScore(total);
    updateData(id, name, email, comments, total);
  };

  const updateData = (id, name, email, comments, total) => {
    const url = `https://localhost:7013/api/Users/${id}`;
    const data = {
      name: name,
      email: email,
      comments: "",
      depression_Score: total,
      clientOfC3A: "",
      email_Sent: total > 5 ? "Yes" : "No",
    };

    axios
      .put(url, data, {
        headers: {
          token, //nclude the token in the Authorization header
        },
      })
      .then((response) => {
        // getData();
        // clear();
        console.log("response", response);
        toast.success("Data updated successfully");
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error);
      });
  };

  return (
    <div style={{ zoom: 1.25 }}>
      <ThemeProvider theme={theme}>
        <ChatBot
          className="custom-chatbot"
          headerTitle="Depression Screening Bot"
          handleEnd={(steps) => handleReview(steps)}
          hideUserInput={true}
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
                "In each question, please select one of the following options",
              trigger: "3",
            },
            {
              id: "3",
              message: "Question 1",
              trigger: "q1",
            },
            {
              id: "q1",
              options: [
                { value: 0, label: "I do not feel sad", trigger: "5" },
                { value: 1, label: "I feel sad", trigger: "5" },
                {
                  value: 2,
                  label: "I am sad all the time and I cant snap out of it.",
                  trigger: "5",
                },
                {
                  value: 3,
                  label: "I am so sad and unhappy that I cant stand it.",
                  trigger: "5",
                },
              ],
            },
            {
              id: "5",
              message: "Question 2",
              trigger: "q2",
            },
            {
              id: "q2",
              options: [
                {
                  value: 0,
                  label: "I am not particularly discouraged about the future.",
                  trigger: "45",
                },
                {
                  value: 1,
                  label: "I feel discouraged about the future.",
                  trigger: "45",
                },
                {
                  value: 2,
                  label: "I feel I have nothing to look forward to",
                  trigger: "45",
                },
                {
                  value: 3,
                  label:
                    "I feel the future is hopeless and that things cannot improve.",
                  trigger: "7",
                },
              ],
            },
            {
              id: "7",
              message: "Question 3",
              trigger: "q3",
            },
            {
              id: "q3",
              options: [
                {
                  value: 0,
                  label: "I do not feel like a failure.",
                  trigger: "9",
                },
                {
                  value: 1,
                  label: "I feel I have failed more than the average person.",
                  trigger: "9",
                },
                {
                  value: 2,
                  label:
                    "As I look back on my life, all I can see is a lot of failures.",
                  trigger: "9",
                },
                {
                  value: 3,
                  label: "I feel I am a complete failure as a person.",
                  trigger: "9",
                },
              ],
            },
            {
              id: "9",
              message: "Question 4",
              trigger: "q4",
            },
            {
              id: "q4",
              options: [
                {
                  value: 0,
                  label:
                    "I get as much satisfaction out of things as I used to.",
                  trigger: "11",
                },
                {
                  value: 1,
                  label: "I dont enjoy things the way I used to.",
                  trigger: "11",
                },
                {
                  value: 2,
                  label:
                    "I dont get real satisfaction out of anything anymore.",
                  trigger: "11",
                },
                {
                  value: 3,
                  label: "I am dissatisfied or bored with everything.",
                  trigger: "11",
                },
              ],
            },
            {
              id: "11",
              message: "Question 5",
              trigger: "q5",
            },
            {
              id: "q5",
              options: [
                {
                  value: 0,
                  label: "I dont feel particularly guilty",
                  trigger: "13",
                },
                {
                  value: 1,
                  label: "I feel guilty a good part of the time.",
                  trigger: "13",
                },
                {
                  value: 2,
                  label: "I feel quite guilty most of the time.",
                  trigger: "13",
                },
                {
                  value: 3,
                  label: "I feel guilty all of the time.",
                  trigger: "13",
                },
              ],
            },
            {
              id: "13",
              message: "Question 6",
              trigger: "q6",
            },
            {
              id: "q6",
              options: [
                {
                  value: 0,
                  label: "I dont feel I am being punished.",
                  trigger: "15",
                },
                { value: 1, label: "I feel I may be punished.", trigger: "15" },
                { value: 2, label: "I expect to be punished.", trigger: "15" },
                {
                  value: 3,
                  label: "I feel I am being punished.",
                  trigger: "15",
                },
              ],
            },
            {
              id: "15",
              message: "Question 7",
              trigger: "q7",
            },
            {
              id: "q7",
              options: [
                {
                  value: 0,
                  label: "I dont feel disappointed in myself.",
                  trigger: "17",
                },
                {
                  value: 1,
                  label: "I am disappointed in myself.",
                  trigger: "17",
                },
                {
                  value: 2,
                  label: "I am disgusted with myself.",
                  trigger: "17",
                },
                { value: 3, label: "I hate myself.", trigger: "17" },
              ],
            },
            {
              id: "17",
              message: "Question 8",
              trigger: "q8",
            },
            {
              id: "q8",
              options: [
                {
                  value: 0,
                  label: "I dont feel I am any worse than anybody else",
                  trigger: "19",
                },
                {
                  value: 1,
                  label:
                    "I am critical of myself for my weaknesses or mistakes.",
                  trigger: "19",
                },
                {
                  value: 2,
                  label: "I blame myself all the time for my faults.",
                  trigger: "19",
                },
                {
                  value: 3,
                  label: "I blame myself for everything bad that happens.",
                  trigger: "19",
                },
              ],
            },
            {
              id: "19",
              message: "Question 9",
              trigger: "q9",
            },
            {
              id: "q9",
              options: [
                {
                  value: 0,
                  label: "I dont have any thoughts of killing myself.",
                  trigger: "21",
                },
                {
                  value: 1,
                  label:
                    "I have thoughts of killing myself, but I would not carry them out.",
                  trigger: "21",
                },
                {
                  value: 2,
                  label: "I would like to kill myself.",
                  trigger: "21",
                },
                {
                  value: 3,
                  label: "I would kill myself if I had the chance.",
                  trigger: "21",
                },
              ],
            },
            {
              id: "21",
              message: "Question 10",
              trigger: "q10",
            },
            {
              id: "q10",
              options: [
                {
                  value: 0,
                  label: "I would kill myself if I had the chance.",
                  trigger: "23",
                },
                {
                  value: 1,
                  label: "I cry more now than I used to",
                  trigger: "23",
                },
                { value: 2, label: "I cry all the time now.", trigger: "23" },
                {
                  value: 3,
                  label:
                    "I used to be able to cry, but now I cant cry even though I want to",
                  trigger: "23",
                },
              ],
            },
            {
              id: "23",
              message: "Question 11",
              trigger: "q11",
            },
            {
              id: "q11",
              options: [
                {
                  value: 0,
                  label: "I am no more irritated by things than I ever was",
                  trigger: "25",
                },
                {
                  value: 1,
                  label: "I am slightly more irritated now than usual",
                  trigger: "25",
                },
                {
                  value: 2,
                  label:
                    "I am quite annoyed or irritated a good deal of the time.",
                  trigger: "25",
                },
                {
                  value: 3,
                  label: "I feel irritated all the time",
                  trigger: "25",
                },
              ],
            },
            {
              id: "25",
              message: "Question 12",
              trigger: "q12",
            },
            {
              id: "q12",
              options: [
                {
                  value: 0,
                  label: "I have not lost interest in other people.",
                  trigger: "27",
                },
                {
                  value: 1,
                  label:
                    "I am less interested in other people than I used to be",
                  trigger: "27",
                },
                {
                  value: 2,
                  label: "I have lost most of my interest in other people",
                  trigger: "27",
                },
                {
                  value: 3,
                  label: "I have lost all of my interest in other people",
                  trigger: "27",
                },
              ],
            },
            {
              id: "27",
              message: "Question 13",
              trigger: "q13",
            },
            {
              id: "q13",
              options: [
                {
                  value: 0,
                  label: "I make decisions about as well as I ever could",
                  trigger: "29",
                },
                {
                  value: 1,
                  label: "I put off making decisions more than I used to.",
                  trigger: "29",
                },
                {
                  value: 2,
                  label:
                    "I have greater difficulty in making decisions more than I used to.",
                  trigger: "29",
                },
                {
                  value: 3,
                  label: "I cant make decisions at all anymore.",
                  trigger: "29",
                },
              ],
            },
            {
              id: "29",
              message: "Question 14",
              trigger: "q14",
            },
            {
              id: "q14",
              options: [
                {
                  value: 0,
                  label: "I dont feel that I look any worse than I used to",
                  trigger: "31",
                },
                {
                  value: 1,
                  label: "I am worried that I am looking old or unattractive.",
                  trigger: "31",
                },
                {
                  value: 2,
                  label:
                    "I feel unattractive due to permanent changes in my appearance",
                  trigger: "31",
                },
                {
                  value: 3,
                  label: "I believe that I look ugly.",
                  trigger: "31",
                },
              ],
            },
            {
              id: "31",
              message: "Question 15",
              trigger: "q15",
            },
            {
              id: "q15",
              options: [
                {
                  value: 0,
                  label: "I can work about as well as before.",
                  trigger: "33",
                },
                {
                  value: 1,
                  label:
                    "It takes an extra effort to get started at doing something",
                  trigger: "33",
                },
                {
                  value: 2,
                  label: "I have to push myself very hard to do anything.",
                  trigger: "33",
                },
                {
                  value: 3,
                  label: "I cant do any work at all.",
                  trigger: "33",
                },
              ],
            },
            {
              id: "33",
              message: "Question 16",
              trigger: "q16",
            },
            {
              id: "q16",
              options: [
                {
                  value: 0,
                  label: "I can sleep as well as usual.",
                  trigger: "35",
                },
                {
                  value: 1,
                  label: "I dont sleep as well as I used to.",
                  trigger: "35",
                },
                {
                  value: 2,
                  label: "I wake up earlier and struggle to fall back asleep",
                  trigger: "35",
                },
                {
                  value: 3,
                  label: "I wake up hours earlier and cant fall back asleep",
                  trigger: "35",
                },
              ],
            },
            {
              id: "35",
              message: "Question 17",
              trigger: "q17",
            },
            {
              id: "q17",
              options: [
                {
                  value: 0,
                  label: "I dont get more tired than usual",
                  trigger: "37",
                },
                {
                  value: 1,
                  label: "I get tired more easily than I used to.",
                  trigger: "37",
                },
                {
                  value: 2,
                  label: "I get tired from doing almost anything.",
                  trigger: "37",
                },
                {
                  value: 3,
                  label: "I am too tired to do anything",
                  trigger: "37",
                },
              ],
            },
            {
              id: "37",
              message: "Question 18",
              trigger: "q18",
            },
            {
              id: "q18",
              options: [
                {
                  value: 0,
                  label: "My appetite is no worse than usual.",
                  trigger: "39",
                },
                {
                  value: 1,
                  label: "My appetite is not as good as it used to be.",
                  trigger: "39",
                },
                {
                  value: 2,
                  label: "My appetite is much worse now.",
                  trigger: "39",
                },
                {
                  value: 3,
                  label: "I have no appetite at all anymore",
                  trigger: "39",
                },
              ],
            },
            {
              id: "39",
              message: "Question 19",
              trigger: "q19",
            },
            {
              id: "q19",
              options: [
                {
                  value: 0,
                  label: "I havent lost much weight, if any, lately.",
                  trigger: "41",
                },
                {
                  value: 1,
                  label: "I have lost more than five pounds",
                  trigger: "41",
                },
                {
                  value: 2,
                  label: "I have lost more than ten pounds.",
                  trigger: "41",
                },
                {
                  value: 3,
                  label: "I have lost more than fifteen pounds",
                  trigger: "41",
                },
              ],
            },
            {
              id: "41",
              message: "Question 20",
              trigger: "q20",
            },
            {
              id: "q20",
              options: [
                {
                  value: 0,
                  label: "I am no more worried about my health than usual",
                  trigger: "43",
                },
                {
                  value: 1,
                  label:
                    "I worry about physical discomforts like aches, upset stomach, and constipation",
                  trigger: "43",
                },
                {
                  value: 2,
                  label:
                    "I am very worried about physical problems and its hard to think of much else.",
                  trigger: "43",
                },
                {
                  value: 3,
                  label:
                    "I am so worried about my physical problems that I cannot think of anything else.",
                  trigger: "43",
                },
              ],
            },
            {
              id: "43",
              message: "Question 21",
              trigger: "q21",
            },
            {
              id: "q21",
              options: [
                {
                  value: 0,
                  label:
                    "I have not noticed any recent change in my interest in sex",
                  trigger: "45",
                },
                {
                  value: 1,
                  label: "I am less interested in sex than I used to be.",
                  trigger: "45",
                },
                {
                  value: 2,
                  label: "I have almost no interest in sex.",
                  trigger: "45",
                },
                {
                  value: 3,
                  label: "I have lost interest in sex completely",
                  trigger: "45",
                },
              ],
            },
            {
              id: "45",
              message: "Thank you for your submission of Depression Form",
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

export default DepressionFormBot;
