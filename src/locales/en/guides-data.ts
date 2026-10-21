/**
 * English guides for goodtalkcards.com under /guide/<slug>/, adapted from
 * src/data/guides-indhold.ts. Same structure and the same caution: no therapy,
 * no tests, no promises. Deck ids stay Danish (they are internal ids).
 */
import type { Guide } from "@/data/guides";

export const guidesEn: Guide[] = [
  {
    slug: "active-listening",
    seoTitle: "Active Listening: An Exercise for Couples and Friends",
    metaDescription:
      "An active listening exercise for couples and friends: draw a card, listen, repeat it back in your own words, and ask two follow-up questions. Ten minutes, free.",
    h1: "Active listening: an exercise for couples and friends, with follow-up questions",
    intro:
      "Active listening means showing the other person that you heard what they said before you say anything yourself. Here is a ten-minute exercise where you use a card as a starting point and practice repeating back and asking more. It works for partners, friends, and siblings.",
    afsnit: [
      {
        h2: "What is active listening?",
        tekst: [
          "When you listen actively, your attention stays with the person who is talking. You don't interrupt, you don't rush to give advice, and you don't steer the conversation back to yourself. Afterward, you show that you understood by putting it in your own words and asking about it.",
          "Research on conversation suggests that follow-up questions are one of the clearest ways to show interest. In three studies, people who asked more questions, especially follow-up questions, were liked more by the people they talked to (Huang et al. 2017). Relationship research points the same way: closeness tends to grow when the person sharing feels understood and taken seriously (Reis & Shaver 1988; Laurenceau et al. 1998).",
        ],
      },
      {
        h2: "The exercise: ten minutes with one card",
        tekst: [
          "You need two people. One talks, the other listens, and then you switch. Setting a timer helps, so neither of you has to watch the clock.",
        ],
        punkter: [
          "Draw a card from a deck, or pick one of the questions further down this page.",
          "The speaker answers for two to three minutes. The listener says nothing but is welcome to nod.",
          "The listener repeats the main points in their own words: \"So what you're saying is ...\". The speaker corrects anything that came across wrong.",
          "The listener asks two follow-up questions about what was just said.",
          "Switch roles and draw a new card. Finish by each naming one thing you noticed about the other.",
        ],
      },
      {
        h2: "How to ask a good follow-up question",
        tekst: [
          "A good follow-up question builds on a word or a detail from the answer. If your friend tells you about a bike trip in Vermont, \"What made you pick that trip?\" works better than \"Have you ever been to Maine?\"",
          "Avoid questions that are really advice in disguise, like \"Have you tried ...?\" Save the advice until the other person asks for it. Here are a few openers that almost always work:",
        ],
        punkter: [
          "What did you mean by ...?",
          "What was it like to ...?",
          "What happened right before ...?",
          "Why do you think ...?",
        ],
      },
      {
        h2: "When listening is hard",
        tekst: [
          "It's completely normal to lose the thread, start planning your own reply, or feel the urge to correct the other person. Notice it, and come back to what is being said.",
          "The exercise is meant for calm conversations. If you're in the middle of an argument, it's better to take a break and try the exercise another day. And no one has to answer a card they don't want to: skip it and draw a new one.",
        ],
      },
      {
        h2: "Variations for friends and family",
        tekst: [
          "With three or more people, one person talks at a time, and the others take turns asking one follow-up question each. The person who just shared picks who goes next.",
          "If you get stuck, use the Ask more button in the game. It gives you a random follow-up question that fits most cards.",
        ],
      },
    ],
    spoergsmaal: [
      "Tell me about something that has been on your mind this week.",
      "What was the best moment of your summer?",
      "Tell me about a time you changed your mind about something important.",
      "Who taught you something you still use today?",
      "Tell me about a place where you felt completely at home.",
      "What have you been looking forward to lately, and why?",
      "Tell me about a decision you're glad you made.",
      "What skill have you built up without anyone else noticing?",
      "Tell me about a day that turned out completely different from what you planned.",
      "What do you do when you want some time to yourself?",
      "Tell me about a book, movie, or song that has meant something to you.",
      "What habit from your childhood have you carried with you?",
      "Tell me about a time someone helped you without being asked.",
      "What would you like to learn but have never gotten around to?",
      "Tell me about a conversation you still think about.",
      "What gives you energy on a completely ordinary day?",
      "Tell me about a time you said yes to something that scared you a little.",
      "What would you do with one extra day off every week?",
      "What made you smile on your way home today?",
      "Tell me about a tradition you'd like to pass on.",
    ],
    kilder: [
      {
        kort: "Huang et al. 2017",
        fuld: "Huang, K., Yeomans, M., Brooks, A. W., Minson, J., & Gino, F. (2017). It doesn't hurt to ask: Question-asking increases liking. Journal of Personality and Social Psychology, 113(3), 430-452.",
        forbehold:
          "The studies mostly look at conversations between strangers, for example in online chats and at speed dating. They say nothing about what a listening exercise does for a relationship over time.",
      },
      {
        kort: "Laurenceau et al. 1998",
        fuld: "Laurenceau, J.-P., Barrett, L. F., & Pietromonaco, P. R. (1998). Intimacy as an interpersonal process: The importance of self-disclosure, partner disclosure, and perceived partner responsiveness in interpersonal exchanges. Journal of Personality and Social Psychology, 74(5), 1238-1251.",
        forbehold:
          "Diary studies showing a link between sharing, feeling understood, and feeling close. They don't test a listening exercise like this one.",
      },
      {
        kort: "Reis & Shaver 1988",
        fuld: "Reis, H. T., & Shaver, P. (1988). Intimacy as an interpersonal process. In S. W. Duck (Ed.), Handbook of Personal Relationships (pp. 367-389). Wiley.",
        forbehold: "A theoretical model of how closeness develops, not an experiment.",
      },
    ],
    bunker: ["dybe", "venner", "parforhold", "svaere-samtaler"],
  },
  {
    slug: "love-languages",
    seoTitle: "Love Languages: Questions About Feeling Loved",
    metaDescription:
      "What are love languages, and what does the research say? Questions for the two of you about what makes you feel loved. A conversation, not a personality type.",
    h1: "Love languages: questions about what makes each of you feel loved",
    intro:
      "The idea behind love languages is that we show and feel love in different ways. The research behind it is thin, but asking each other what makes you feel loved is still a good question. Here are questions for a conversation, not a system that puts each of you in a box.",
    afsnit: [
      {
        h2: "What are love languages?",
        tekst: [
          "The idea comes from Gary Chapman, who in 1992 published a book about five ways to express love: words of affirmation, quality time, gifts, acts of service, and physical touch. His claim is that each of us has one preferred language, and that a relationship gets better when your partner learns to speak it.",
          "Many people know the term from online quizzes. But the book is based on the author's own experience, not on systematic research.",
        ],
      },
      {
        h2: "What does the research say?",
        tekst: [
          "In 2024, psychologists Impett, Park, and Muise reviewed the research that exists on love languages. There isn't much of it, and taken together it does not give strong support to the book's three core ideas: that each person has one preferred language, that there are exactly five, and that couples are more satisfied when they speak each other's language.",
          "Individual studies point in different directions. One study of 67 couples found only limited support for the idea that sharing the same language was linked to satisfaction (Bunt & Hazelwood 2017). Another, with 100 couples, found that people whose partner showed love in the way they themselves preferred were more satisfied (Mostova et al. 2022). So the picture is mixed, and there is no basis for using the five languages as a fixed set of types.",
        ],
      },
      {
        h2: "A balanced diet instead of one language",
        tekst: [
          "Impett and her colleagues suggest a different picture: love is less like a language you have to learn and more like a balanced diet, where you need a little of everything. Most people appreciate kind words, time together, a helping hand, and a hug, just in different amounts and at different times.",
          "That's why it makes more sense to ask each other than to figure out your type. What makes you feel loved during a busy week can be something completely different from what does it on a slow summer vacation.",
        ],
      },
      {
        h2: "The exercise: ask each other for concrete examples",
        tekst: ["Set aside half an hour, and put your phones away, except the one you're playing on."],
        punkter: [
          "Take turns picking a question from the list below. You both answer the same question.",
          "Give a concrete example from your own life, not a general answer.",
          "The person listening asks more: \"What was it about that, exactly, that made a difference?\"",
          "Finish by each naming one small thing you'd like to do for the other person in the coming week.",
        ],
      },
    ],
    spoergsmaal: [
      "When did you last feel really taken care of by me?",
      "What words of mine do you still remember, even though it was a long time ago?",
      "What matters more to you: that I say it, or that I show it?",
      "What small everyday help do you notice the most?",
      "When did a gift from me feel exactly right, and why?",
      "What's the best part of an evening when we're just together with no plans?",
      "Which hug from me do you remember best?",
      "What did your parents do when they wanted to show they cared about you?",
      "How do you show love yourself when you're not thinking about it?",
      "Is there something I do out of love that you only noticed later?",
      "What makes you feel missed when we've been apart?",
      "What kind of praise makes you happy, and what kind makes you uncomfortable?",
      "When have I given you something you didn't know you needed?",
      "What task could I take off your plate during a busy week that would make a difference?",
      "How would you like me to take care of you when you're sick?",
      "Which of my habits shows you that I'm thinking of you?",
      "Is there something you'd like more of from me but find hard to ask for?",
      "How would you prefer that I say I'm sorry?",
      "What makes you feel chosen, even after many years?",
      "When have you tried to show me love without me noticing?",
      "How has what makes you feel loved changed since we met?",
      "Which of your friends is best at showing they care, and how do they do it?",
      "When we're with other people, what do I do that makes you feel seen?",
      "Which of the little things I do would you miss most if I stopped?",
    ],
    kilder: [
      {
        kort: "Chapman 1992",
        fuld: "Chapman, G. (1992). The Five Love Languages: How to Express Heartfelt Commitment to Your Mate. Northfield Publishing.",
        forbehold:
          "A self-help book based on the author's experience. It is not a scientific study and is cited here only as the source of the concept.",
      },
      {
        kort: "Impett, Park & Muise 2024",
        fuld: "Impett, E. A., Park, H. G., & Muise, A. (2024). Popular psychology through a scientific lens: Evaluating love languages from a relationship science perspective. Current Directions in Psychological Science, 33(2), 87-92.",
        forbehold: "A review and opinion piece, not a new study. It rests on a small body of research.",
      },
      {
        kort: "Bunt & Hazelwood 2017",
        fuld: "Bunt, S., & Hazelwood, Z. J. (2017). Walking the walk, talking the talk: Love languages, self-regulation, and relationship satisfaction. Personal Relationships, 24(2), 280-290.",
        forbehold: "67 heterosexual couples, measured at one point in time. It can't tell us anything about cause and effect.",
      },
      {
        kort: "Mostova et al. 2022",
        fuld: "Mostova, O., Stolarski, M., & Matthews, G. (2022). I love the way you love me: Responding to partner's love language preferences boosts satisfaction in romantic heterosexual couples. PLOS ONE, 17(6), e0269429.",
        forbehold:
          "100 heterosexual couples, measured at one point in time. It shows a link, not that learning your partner's language will make you more satisfied.",
      },
    ],
    bunker: ["kend-din-partner", "tak", "parforhold"],
  },
  {
    slug: "love-maps",
    seoTitle: "Love Maps: Questions That Keep You Up to Date",
    metaDescription:
      "Love maps are your picture of each other's lives right now. Here are questions that keep you up to date, and what the research says about the Four Horsemen.",
    h1: "Love maps: questions that keep you up to date on each other",
    intro:
      "A love map is the picture you carry of your partner's life right now: friends, worries, dreams, and everyday routines. That picture gets out of date fast, because people change, even when they live together. The questions below can help you keep it current.",
    afsnit: [
      {
        h2: "What is a love map?",
        tekst: [
          "The term comes from the American psychologist John Gottman, who has spent many years studying couples in the lab. In his 1999 book The Seven Principles for Making Marriage Work, he describes love maps as the part of your memory where you store what you know about your partner's life: who matters to them, what stresses them out, and what they hope for.",
          "Gottman's idea is that couples who know each other's inner world in detail are better prepared when life changes.",
        ],
      },
      {
        h2: "The Four Horsemen, and what we don't know",
        tekst: [
          "Gottman is best known for studies that tried to predict divorce from how couples talk during a conflict. That's where the Four Horsemen come from: criticism, contempt, defensiveness, and stonewalling. In his studies, a pattern with more negativity than positivity in conflict conversations was linked to later breakups (Gottman & Levenson 1992).",
          "The high accuracy figures that are often quoted should be taken with caution, though. Heyman and Slep showed in 2001 that predictions that haven't been tested on a new group of couples can greatly overstate accuracy. The love map concept itself is a model from Gottman's books and workshops, and we haven't found an independent study that tests it on its own.",
        ],
      },
      {
        h2: "The exercise: guess, answer, and ask more",
        tekst: ["Love maps are about knowing, not about being right. Make it a game, not an exam."],
        punkter: [
          "One of you reads a question out loud and guesses what the other will answer.",
          "The other answers and says what the guess got right and what it missed.",
          "Ask one follow-up question before you move on.",
          "Switch roles for each question. Five questions are plenty for one evening.",
        ],
      },
      {
        h2: "Keep the picture current",
        tekst: [
          "A love map is never finished. Come back to some of the questions in six months and see what has changed. That's often where the best conversations happen.",
          "On Goodtalk, you'll find similar questions in the Know Your Partner deck.",
        ],
      },
    ],
    spoergsmaal: [
      "Which of your friends have you talked to most in the past month?",
      "What's the first thing you think about when you wake up these days?",
      "What task at work or at home is taking up the most space for you right now?",
      "What plan on your calendar are you looking forward to most?",
      "Who in your family have you been thinking about most lately, and why?",
      "What have you read, watched, or listened to recently that you can't stop thinking about?",
      "What's your favorite meal these days?",
      "If you got the day off tomorrow, what would the day look like?",
      "What are you working on getting better at?",
      "What has worried you recently that you haven't mentioned to me?",
      "Who would you call first if you got bad news?",
      "What's the smallest thing that could make your day better right now?",
      "Where in the world do you daydream about going these days?",
      "What are you proud of from the past year?",
      "Which of your old dreams still matters to you?",
      "What annoys you most in everyday life right now?",
      "What song do you connect with this time in your life?",
      "What has become more important to you since we met?",
      "What topic could you talk about for hours these days?",
      "What does it take for you to fully relax on a Friday night?",
    ],
    kilder: [
      {
        kort: "Gottman & Silver 1999",
        fuld: "Gottman, J. M., & Silver, N. (1999). The Seven Principles for Making Marriage Work. New York: Harmony Books (Crown).",
        forbehold:
          "A popular book based on Gottman's research and clinical experience. The love map concept itself has not been tested in an independent study.",
      },
      {
        kort: "Gottman & Levenson 1992",
        fuld: "Gottman, J. M., & Levenson, R. W. (1992). Marital processes predictive of later dissolution: Behavior, physiology, and health. Journal of Personality and Social Psychology, 63(2), 221-233.",
        forbehold:
          "73 couples followed over time. It shows a link between conflict patterns and later breakups, but the predictions were not tested on a new group of couples.",
      },
      {
        kort: "Heyman & Slep 2001",
        fuld: "Heyman, R. E., & Smith Slep, A. M. (2001). The hazards of predicting divorce without crossvalidation. Journal of Marriage and Family, 63(2), 473-479.",
        forbehold:
          "Uses a different dataset from Gottman's to illustrate the problem. It doesn't say Gottman's findings are wrong, only that the accuracy is probably overstated.",
      },
    ],
    bunker: ["kend-din-partner", "svaere-samtaler", "parforhold"],
  },
  {
    slug: "communication-in-relationships",
    seoTitle: "Communication in Relationships: Everyday Exercises",
    metaDescription:
      "Everyday exercises for communication in relationships: a gentle start-up, good news, follow-up questions, and breaks in a fight. Plus when to get outside help.",
    h1: "Communication in relationships: conversation exercises for everyday life",
    intro:
      "Many couples mostly talk about practical things, and then the hard conversations get harder when they finally come up. Here are four small exercises inspired by relationship research: starting gently, responding to good news, asking more, and taking a break. At the end, you can read about when it's a good idea to get help from outside.",
    afsnit: [
      {
        h2: "Start gently when something is hard",
        tekst: [
          "The way a difficult conversation begins often sets the tone for the rest of it. In a study of newlywed couples, the first three minutes of a conflict discussion were linked to whether the couple later divorced (Carrère & Gottman 1999). The finding has not been tested on a new group of couples, so treat it as a rough guide, not a rule.",
          "A gentle start-up means saying what you feel and what you need, instead of criticizing the other person.",
        ],
        punkter: [
          "Harsh start-up: \"You never think about anyone but yourself.\"",
          "Gentle start-up: \"I get upset when plans change at the last minute. Can we agree to tell each other well ahead of time?\"",
          "Practice: Take a small irritation from this week and say it out loud in the form \"I feel ... when ... and I need ...\".",
        ],
      },
      {
        h2: "Respond well to good news",
        tekst: [
          "How you respond when your partner shares something good is linked to how the relationship is doing. In a study of 79 dating couples, the response to good news was more closely tied to relationship well-being than the response to bad news (Gable et al. 2006).",
          "A good response is curious and engaged: you ask questions, you're happy for them, and you let the news take up some space. A less helpful one is a distracted \"cool\" or a quick turn to what could go wrong.",
          "Exercise: Every evening for a week, tell each other one good thing from your day, and let the other person ask two questions about it before you talk about anything else.",
        ],
      },
      {
        h2: "Ask before you answer",
        tekst: [
          "When your partner tells you about something that's weighing on them, it's tempting to offer solutions right away. Try asking one follow-up question first instead. People who ask follow-up questions are liked more by the people they talk to (Huang et al. 2017), although those studies mostly look at conversations between strangers.",
          "For example, ask: \"Do you want me to help you solve it, or do you just want to tell me about it?\" Neither answer is better than the other, but it helps to know what the other person needs.",
        ],
      },
      {
        h2: "Take a break when an argument spirals",
        tekst: [
          "Some arguments go in circles because you're both too upset to listen. Then it's often wiser to stop than to keep going.",
        ],
        punkter: [
          "Agree ahead of time on a word or a signal that means pause, one that either of you can use.",
          "Say when you'll pick the conversation back up, for example in an hour or tomorrow after dinner.",
          "Use the break for something that slows you down, like a walk, not for polishing your arguments.",
          "When you start again, start gently.",
        ],
      },
      {
        h2: "When should you get help?",
        tekst: [
          "These exercises are for couples who are doing reasonably well and want to talk better. They aren't enough if your conversations often end in fights you can't find your way out of, or if the same conflict keeps going in circles.",
          "If there is violence, threats, or controlling behavior in the relationship, these exercises are not the right place to start. Contact a domestic violence hotline (findahelpline.com lists them by country). If one of you feels unsafe or pressured, or has been struggling with mental health for a long time, talk to a doctor or a licensed counselor. If anyone is in immediate danger, call your local emergency number.",
        ],
      },
    ],
    spoergsmaal: [
      "What's a small thing from this week you'd like to say out loud in a gentle way?",
      "How can I tell that you're starting to feel overwhelmed in an argument?",
      "What do you need from me when you come home after a hard day?",
      "What recent good news did you never get to share properly?",
      "How would you like me to respond when you tell me about something you're happy about?",
      "What did I do the last time you felt really heard by me?",
      "What topic do we often avoid because it usually goes badly?",
      "What would make it easier for you to disagree with me?",
      "What does a break in the middle of a disagreement mean to you?",
      "How can we show each other we're still on the same team when we disagree?",
      "What time of day is best for us to talk about something hard?",
      "What did you learn at home about how people argue?",
      "What do you need to hear from me after we've disagreed?",
      "Which of my reactions makes it hard for you to keep talking?",
      "When did we handle a disagreement well, and what did we do?",
      "What's something I say that makes you feel understood?",
      "When do you want advice from me, and when do you just want me to listen?",
      "How can we make more time to talk about things other than logistics?",
      "What do you like about the way we talk to each other?",
      "What small thing could we both do differently next week?",
    ],
    kilder: [
      {
        kort: "Carrère & Gottman 1999",
        fuld: "Carrère, S., & Gottman, J. M. (1999). Predicting divorce among newlyweds from the first three minutes of a marital conflict discussion. Family Process, 38(3), 293-301.",
        forbehold:
          "From the same research group as Gottman's other studies, and the prediction was not tested on a new group of couples. The study does not test whether practicing a gentle start-up helps.",
      },
      {
        kort: "Gable et al. 2006",
        fuld: "Gable, S. L., Gonzaga, G. C., & Strachman, A. (2006). Will you be there for me when things go right? Supportive responses to positive event disclosures. Journal of Personality and Social Psychology, 91(5), 904-917.",
        forbehold:
          "79 dating couples followed for two months. It shows a link, not that a good-news exercise changes a relationship.",
      },
      {
        kort: "Huang et al. 2017",
        fuld: "Huang, K., Yeomans, M., Brooks, A. W., Minson, J., & Gino, F. (2017). It doesn't hurt to ask: Question-asking increases liking. Journal of Personality and Social Psychology, 113(3), 430-452.",
        forbehold: "The studies mostly look at conversations between strangers, not couples in long-term relationships.",
      },
    ],
    bunker: ["svaere-samtaler", "gode-nyheder", "tak"],
  },
];
