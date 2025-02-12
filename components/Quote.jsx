import React, { useEffect, useState } from "react";
import styles from "@/styles/Quote.module.css";
import { VscClose, VscQuote, VscSettings, VscSettingsGear } from "react-icons/vsc";
import { useSelectedQuoteThemes } from "../context/selectedQuoteThemes";
import { useRouter } from "next/router";
import Link from "next/link";

const Quote = ({ setQuoteVisible }) => {
    const router = useRouter();
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
            <div className={styles.titleContainer}>
                <p className={styles.title}>Quote of the day</p>
                <div className={styles.content}>
                    <Link href="/settings">
                        <VscSettingsGear className={styles.icon} />
                    </Link>
                    <VscClose onClick={() => setQuoteVisible(false)} className={styles.closeIcon} />
                </div>
            </div>
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
