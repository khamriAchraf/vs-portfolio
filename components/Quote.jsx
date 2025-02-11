import React, { useEffect, useState } from "react";
import styles from "@/styles/Quote.module.css";
import { VscQuote } from "react-icons/vsc";
import { useSelectedQuoteThemes } from "../context/selectedQuoteThemes";

const Quote = ({ setQuoteVisible }) => {
    const [quote, setQuote] = useState({ content: "", author: "" });

    const { selectedTopics, handleAddTheme, handleRemoveTheme } = useSelectedQuoteThemes();

    const fetchQuote = async () => {
        try {
            const response = await fetch(
                `/api/quotes?themes=${selectedTopics.join(",")}`
            );

            const data = await response.json();
            if (data) {
                const newQuote = {
                    content: data.quote,
                    author: data.author,
                    date: new Date().toDateString(),
                };
                localStorage.setItem("dailyQuote", JSON.stringify(newQuote));
                setQuote(newQuote);
            }
        } catch (error) {
            console.error("Error fetching quote:", error);
        }
    };


    useEffect(() => {
        const savedQuote = localStorage.getItem("dailyQuote");
        if (savedQuote) {
            const parsedQuote = JSON.parse(savedQuote);
            if (parsedQuote.date === new Date().toDateString()) {
                setQuote(parsedQuote);
            } else {
                fetchQuote();
            }
        } else {
            fetchQuote();
        }
    }, []);

    return (
        <div className={styles.quote}>
            <p className={styles.title}>Quote of the day</p>
            <div className={styles.content}>
                <VscQuote className={styles.icon} />
                <p>{quote.content}</p>
            </div>

            <div className={styles.btns}>
                <a
                    href={`https://google.com/search?q=${quote.author}`}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    <p className={styles.author}>{quote.author}</p>
                </a >
                <div>
                    <button className={styles.button} onClick={fetchQuote}>
                        Refresh
                    </button>
                    <button
                        className={styles.sbutton}
                        onClick={() => setQuoteVisible(false)}
                    >
                        Dismiss
                    </button>
                </div>
            </div >
        </div >
    );
};

export default Quote;
