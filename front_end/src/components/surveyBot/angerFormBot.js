import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import "./surveyBot.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMyContext } from "../../MyContext"; // Import the context hook

const theme = {
  headerTitle: "Anger Screening Bot",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#1686ec",
  headerFontColor: "#fff",
  headerFontSize: "25px",
  botBubbleColor: "#1686ec",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const AngerFormBot = (props) => {
  const { id, name, email, comments } = props;
  const [totalScore, setTotalScore] = useState(0);
  const { token } = useMyContext();

  const handleReview = (steps) => {
    let total = 0;
    for (let i = 0; i < steps.values.length; i++) {
      total += steps.values[i];
    }

    if (total > 5) {
      // Send email logic here
      const params = new URLSearchParams({
        subject: "High Anger Score Alert",
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
          console.log("Email sent successfully");
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
      // console.log("total", total);
    }

    // console.log("total", total);
    setTotalScore(total);
    updateData(id, name, email, comments, total);
  };

  console.log("totalScore", totalScore);
  console.log("id", id);
  console.log("name", name);
  console.log("email", email);
  const messages = (score) => {
    if (score <= 13) {
      return "Your score indicates you have a healthy state of mind. So chill and enjoy life.";
    } else if (score >= 14 && score < 20) {
      return "Your score indicates symptoms of mild Anger.";
    } else if (score >= 20 && score < 29) {
      return "Your score indicates symptoms of moderate Anger.";
    } else {
      return "Your score indicates Potential Concerning Levels of Anger.";
    }
  };

  const updateData = (id, name, email, comments, total) => {
    const url = `https://localhost:7013/api/Users/${id}`;
    const data = {
      name: name,
      email: email,
      comments: "",
      anger_Score: total,
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
        toast.success("Data updated successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <div style={{ zoom: 1.25 }} className="bot-container">
      <ThemeProvider theme={theme}>
        <ChatBot
          className="custom-chatbot"
          headerTitle="Anger Screening Bot"
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
              delay: 0,
            },
            {
              id: "2",
              message:
                "In each question, please select one of the following options",
              trigger: "3",
              delay: 1500,
            },
            {
              id: "3",
              message: "Question 1",
              trigger: "q1",
              delay: 1500,
            },
            {
              id: "q1",
              delay: 1000,
              options: [
                {
                  value: 0,
                  label: "I am not particularly angry about my future.",
                  trigger: "q21",
                },
                {
                  value: 1,
                  label: "When I think about my future, I feel angry.",
                  trigger: "q21",
                },
                {
                  value: 2,
                  label: "I feel angry about what I have to look forward to.",
                  trigger: "q21",
                },
                {
                  value: 3,
                  label:
                    "I feel intensely angry about my future, since it cannot be improved.",
                  trigger: "q21",
                },
              ],
            },
            // {
            //   id: "5",
            //   message: "Question 2",
            //   trigger: "q2",
            // },
            // {
            //   id: "q2",
            //   options: [
            //     {
            //       value: 0,
            //       label: "It makes me angry that I feel like such a failure.",
            //       trigger: "7",
            //     },
            //     {
            //       value: 1,
            //       label:
            //         "It makes me angry that I have failed more than the average person",
            //       trigger: "7",
            //     },
            //     {
            //       value: 2,
            //       label:
            //         "As I look back on my life, I feel angry about my failures",
            //       trigger: "7",
            //     },
            //     {
            //       value: 3,
            //       label:
            //         "It makes me angry to feel like a complete failure as a person",
            //       trigger: "7",
            //     },
            //   ],
            // },
            // {
            //   id: "7",
            //   message: "Question 3",
            //   trigger: "q3",
            // },
            // {
            //   id: "q3",
            //   options: [
            //     {
            //       value: 0,
            //       label: "I am not all that angry about things",
            //       trigger: "9",
            //     },
            //     {
            //       value: 1,
            //       label:
            //         "I am becoming more hostile about things than I used to be",
            //       trigger: "9",
            //     },
            //     {
            //       value: 2,
            //       label: "I am pretty angry about things these days",
            //       trigger: "9",
            //     },
            //     {
            //       value: 3,
            //       label: "I am angry and hostile about everything.",
            //       trigger: "9",
            //     },
            //   ],
            // },
            // {
            //   id: "9",
            //   message: "Question 4",
            //   trigger: "q4",
            // },
            // {
            //   id: "q4",
            //   options: [
            //     {
            //       value: 0,
            //       label: "I dont feel particularly hostile at others",
            //       trigger: "11",
            //     },
            //     {
            //       value: 1,
            //       label: "I feel hostile a good deal of the time",
            //       trigger: "11",
            //     },
            //     {
            //       value: 2,
            //       label: "I feel quite hostile most of the time.",
            //       trigger: "11",
            //     },
            //     {
            //       value: 3,
            //       label: "I feel hostile all of the time",
            //       trigger: "11",
            //     },
            //   ],
            // },
            // {
            //   id: "11",
            //   message: "Question 5",
            //   trigger: "q5",
            // },
            // {
            //   id: "q5",
            //   options: [
            //     {
            //       value: 0,
            //       label: "I dont feel that others are trying to annoy me",
            //       trigger: "13",
            //     },
            //     {
            //       value: 1,
            //       label: "At times I think people are trying to annoy me",
            //       trigger: "13",
            //     },
            //     {
            //       value: 2,
            //       label:
            //         "More people than usual are beginning to make me feel angry",
            //       trigger: "13",
            //     },
            //     {
            //       value: 3,
            //       label:
            //         "I feel that others are constantly and intentionally making me angry",
            //       trigger: "13",
            //     },
            //   ],
            // },
            // {
            //   id: "13",
            //   message: "Question 6",
            //   trigger: "q6",
            // },
            // {
            //   id: "q6",
            //   options: [
            //     {
            //       value: 0,
            //       label: "I dont feel angry when I think about myself.",
            //       trigger: "15",
            //     },
            //     {
            //       value: 1,
            //       label:
            //         "I feel more angry about myself these days than I used to.",
            //       trigger: "15",
            //     },
            //     {
            //       value: 2,
            //       label: "I feel angry about myself a good deal of the time.",
            //       trigger: "15",
            //     },
            //     {
            //       value: 3,
            //       label: "When I think about myself, I feel intense anger",
            //       trigger: "15",
            //     },
            //   ],
            // },
            // {
            //   id: "15",
            //   message: "Question 7",
            //   trigger: "q7",
            // },
            // {
            //   id: "q7",
            //   options: [
            //     {
            //       value: 0,
            //       label:
            //         "I dont have angry feelings about others having screwed up my life.",
            //       trigger: "17",
            //     },
            //     {
            //       value: 1,
            //       label:
            //         "Its beginning to make me angry that others are screwing up my life",
            //       trigger: "17",
            //     },
            //     {
            //       value: 2,
            //       label:
            //         "I feel angry that others prevent me from having a good life.",
            //       trigger: "17",
            //     },
            //     {
            //       value: 3,
            //       label:
            //         "I am constantly angry because others have made my life totally miserable.",
            //       trigger: "17",
            //     },
            //   ],
            // },
            // {
            //   id: "17",
            //   message: "Question 8",
            //   trigger: "q8",
            // },
            // {
            //   id: "q8",
            //   options: [
            //     {
            //       value: 0,
            //       label: "I dont feel angry enough to hurt someone",
            //       trigger: "19",
            //     },
            //     {
            //       value: 1,
            //       label:
            //         "Sometimes I am so angry that I feel like hurting others, but I would not really do it",
            //       trigger: "19",
            //     },
            //     {
            //       value: 2,
            //       label:
            //         "My anger is so intense that I sometimes feel like hurting others.",
            //       trigger: "19",
            //     },
            //     {
            //       value: 3,
            //       label: "Im so angry that I would like to hurt someone",
            //       trigger: "19",
            //     },
            //   ],
            // },
            // {
            //   id: "19",
            //   message: "Question 9",
            //   trigger: "q9",
            // },
            // {
            //   id: "q9",
            //   options: [
            //     {
            //       value: 0,
            //       label: "I dont shout at people any more than usual.",
            //       trigger: "21",
            //     },
            //     {
            //       value: 1,
            //       label: "I shout at others more now than I used to.",
            //       trigger: "21",
            //     },
            //     {
            //       value: 2,
            //       label: "I shout at others more now than I used to.",
            //       trigger: "21",
            //     },
            //     {
            //       value: 3,
            //       label:
            //         "I shout at others so often that sometimes I just cant stop.",
            //       trigger: "21",
            //     },
            //   ],
            // },
            // {
            //   id: "21",
            //   message: "Question 10",
            //   trigger: "q10",
            // },
            // {
            //   id: "q10",
            //   options: [
            //     {
            //       value: 0,
            //       label:
            //         "I shout at others so often that sometimes I just cant stop.",
            //       trigger: "23",
            //     },
            //     {
            //       value: 1,
            //       label: "I feel slightly more irritated now than usual.",
            //       trigger: "23",
            //     },
            //     {
            //       value: 2,
            //       label: "I feel irritated a good deal of the time.",
            //       trigger: "23",
            //     },
            //     {
            //       value: 3,
            //       label: "Im irritated all the time now.",
            //       trigger: "23",
            //     },
            //   ],
            // },
            // {
            //   id: "23",
            //   message: "Question 11",
            //   trigger: "q11",
            // },
            // {
            //   id: "q11",
            //   options: [
            //     {
            //       value: 0,
            //       label:
            //         "My anger does not interfere with my interest in other people.",
            //       trigger: "25",
            //     },
            //     {
            //       value: 1,
            //       label:
            //         "My anger sometimes interferes with my interest in others.",
            //       trigger: "25",
            //     },
            //     {
            //       value: 2,
            //       label:
            //         "I am becoming so angry that I dont want to be around others.",
            //       trigger: "25",
            //     },
            //     {
            //       value: 3,
            //       label: "Im so angry that I cant stand being around people",
            //       trigger: "25",
            //     },
            //   ],
            // },
            // {
            //   id: "25",
            //   message: "Question 12",
            //   trigger: "q12",
            // },
            // {
            //   id: "q12",
            //   options: [
            //     {
            //       value: 0,
            //       label:
            //         "I dont have any persistent angry feelings that influence my ability to make decisions",
            //       trigger: "27",
            //     },
            //     {
            //       value: 1,
            //       label:
            //         "My feelings of anger occasionally undermine my ability to make decisions",
            //       trigger: "27",
            //     },
            //     {
            //       value: 2,
            //       label:
            //         "I am angry to the extent that it interferes with my making good decisions",
            //       trigger: "27",
            //     },
            //     {
            //       value: 3,
            //       label: "Im so angry that I cant make good decisions anymore.",
            //       trigger: "27",
            //     },
            //   ],
            // },
            // {
            //   id: "27",
            //   message: "Question 13",
            //   trigger: "q13",
            // },
            // {
            //   id: "q13",
            //   options: [
            //     { value: 0, label: "I do not feel angry", trigger: "29" },
            //     { value: 1, label: "I feel angry.", trigger: "29" },
            //     {
            //       value: 2,
            //       label: "I am angry most of the time now.",
            //       trigger: "29",
            //     },
            //     {
            //       value: 3,
            //       label:
            //         "I am so angry and hostile all the time that I cant stand it.",
            //       trigger: "29",
            //     },
            //   ],
            // },
            // {
            //   id: "29",
            //   message: "Question 14",
            //   trigger: "q14",
            // },
            // {
            //   id: "q14",
            //   options: [
            //     {
            //       value: 0,
            //       label: "Im not so angry and hostile that others dislike me",
            //       trigger: "31",
            //     },
            //     {
            //       value: 1,
            //       label:
            //         "People sometimes dislike being around me since I become angry.",
            //       trigger: "31",
            //     },
            //     {
            //       value: 2,
            //       label:
            //         "More often than not, people stay away from me because Im so hostile and angry.",
            //       trigger: "31",
            //     },
            //     {
            //       value: 3,
            //       label:
            //         "People dont like me anymore because Im constantly angry all the time",
            //       trigger: "31",
            //     },
            //   ],
            // },
            // {
            //   id: "31",
            //   message: "Question 15",
            //   trigger: "q15",
            // },
            // {
            //   id: "q15",
            //   options: [
            //     {
            //       value: 0,
            //       label: "My feelings of anger do not interfere with my work.",
            //       trigger: "33",
            //     },
            //     {
            //       value: 1,
            //       label:
            //         "From time to time my feelings of anger interfere with my work.",
            //       trigger: "33",
            //     },
            //     {
            //       value: 2,
            //       label:
            //         "I feel so angry that it interferes with my capacity to work.",
            //       trigger: "33",
            //     },
            //     {
            //       value: 3,
            //       label:
            //         "My feelings of anger prevent me from doing any work at all",
            //       trigger: "33",
            //     },
            //   ],
            // },
            // {
            //   id: "33",
            //   message: "Question 16",
            //   trigger: "q16",
            // },
            // {
            //   id: "q16",
            //   options: [
            //     {
            //       value: 0,
            //       label: "My anger does not interfere with my sleep.",
            //       trigger: "35",
            //     },
            //     {
            //       value: 1,
            //       label:
            //         "Sometimes I dont sleep very well because Im feeling angry.",
            //       trigger: "35",
            //     },
            //     {
            //       value: 2,
            //       label:
            //         "My anger is so great that I stay awake 1—2 hours later than usual",
            //       trigger: "35",
            //     },
            //     {
            //       value: 3,
            //       label:
            //         "I am so intensely angry that I cant get much sleep during the night.",
            //       trigger: "35",
            //     },
            //   ],
            // },
            // {
            //   id: "35",
            //   message: "Question 17",
            //   trigger: "q17",
            // },
            // {
            //   id: "q17",
            //   options: [
            //     {
            //       value: 0,
            //       label:
            //         "My anger does not make me feel anymore tired than usual",
            //       trigger: "37",
            //     },
            //     {
            //       value: 1,
            //       label: "My feelings of anger are beginning to tire me out",
            //       trigger: "37",
            //     },
            //     {
            //       value: 2,
            //       label:
            //         "My anger is intense enough that it makes me feel very tired",
            //       trigger: "37",
            //     },
            //     {
            //       value: 3,
            //       label:
            //         "My feelings of anger leave me too tired to do anything.",
            //       trigger: "37",
            //     },
            //   ],
            // },
            // {
            //   id: "37",
            //   message: "Question 18",
            //   trigger: "q18",
            // },
            // {
            //   id: "q18",
            //   options: [
            //     {
            //       value: 0,
            //       label:
            //         "My appetite does not suffer because of my feelings of anger.",
            //       trigger: "39",
            //     },
            //     {
            //       value: 1,
            //       label:
            //         "My appetite does not suffer because of my feelings of anger",
            //       trigger: "39",
            //     },
            //     {
            //       value: 2,
            //       label:
            //         "My feelings of anger leave me without much of an appetite",
            //       trigger: "39",
            //     },
            //     {
            //       value: 3,
            //       label:
            //         "My anger is so intense that it has taken away my appetite",
            //       trigger: "39",
            //     },
            //   ],
            // },
            // {
            //   id: "39",
            //   message: "Question 19",
            //   trigger: "q19",
            // },
            // {
            //   id: "q19",
            //   options: [
            //     {
            //       value: 0,
            //       label: "My feelings of anger dont interfere with my health.",
            //       trigger: "41",
            //     },
            //     {
            //       value: 1,
            //       label:
            //         "My feelings of anger are beginning to interfere with my health.",
            //       trigger: "41",
            //     },
            //     {
            //       value: 2,
            //       label:
            //         "My anger prevents me from devoting much time and attention to my health.",
            //       trigger: "41",
            //     },
            //     {
            //       value: 3,
            //       label:
            //         "Im so angry at everything these days that I pay no attention to my health and well-being",
            //       trigger: "41",
            //     },
            //   ],
            // },
            // {
            //   id: "41",
            //   message: "Question 20",
            //   trigger: "q20",
            // },
            // {
            //   id: "q20",
            //   options: [
            //     {
            //       value: 0,
            //       label:
            //         "My ability to think clearly is unaffected by my feelings of anger.",
            //       trigger: "43",
            //     },
            //     {
            //       value: 1,
            //       label:
            //         "Sometimes my feelings of anger prevent me from thinking in a clear-headed way.",
            //       trigger: "43",
            //     },
            //     {
            //       value: 2,
            //       label:
            //         "My anger makes it hard for me to think of anything else.",
            //       trigger: "43",
            //     },
            //     {
            //       value: 3,
            //       label:
            //         "Im so intensely angry and hostile that it completely interferes with my thinking.",
            //       trigger: "43",
            //     },
            //   ],
            // },
            // {
            //   id: "43",
            //   message: "Question 21",
            //   trigger: "q21",
            // },
            {
              id: "q21",
              options: [
                {
                  value: 0,
                  label:
                    "I dont feel so angry that it interferes with my interest in sex.",
                  trigger: "45",
                },
                {
                  value: 1,
                  label:
                    "My feelings of anger leave me less interested in sex than I used to be.",
                  trigger: "45",
                },
                {
                  value: 2,
                  label:
                    "My current feelings of anger undermine my interest in sex",
                  trigger: "45",
                },
                {
                  value: 3,
                  label:
                    "Im so angry about my life that Ive completely lost interest in sex",
                  trigger: "45",
                },
              ],
            },
            {
              id: "45",
              message:
                "Thank you for your submission of Screening form for Anger",
              trigger: "review-message",
            },
            {
              id: "review-message",
              message: messages(totalScore),
              trigger: "end",
            },
            {
              id: "end",
              message: "Good Bye",
              end: true,
            },
          ]}
          style={{ width: "100%", height: "80%" }}
        />
      </ThemeProvider>
    </div>
  );
};

export default AngerFormBot;
