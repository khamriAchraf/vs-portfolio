import React, { useEffect, useState } from 'react'
import styles from "@/styles/Quote.module.css";
import { VscQuote } from "react-icons/vsc";

const Quote = () => {
    const [quote, setQuote] = useState({ content: '', author: '' });

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await fetch('https://api.quotable.io/quotes/random', {
                    headers: {
                        "accept": "application/json",
                        "content-type": "application/json"
                    },
                    method: "GET",
                    mode: "cors",
                    credentials: "omit"
                });
                const data = await response.json();
                if (data.length > 0) {
                    const newQuote = {
                        content: data[0].content,
                        author: data[0].author,
                        date: new Date().toDateString()
                    };
                    console.log('New quote:', newQuote);
                    localStorage.setItem('dailyQuote', JSON.stringify(newQuote));
                    setQuote(newQuote);
                }
            } catch (error) {
                console.error('Error fetching quote:', error);
            }
        };

        // Check local storage for saved quote
        const savedQuote = localStorage.getItem('dailyQuote');
        if (savedQuote) {
            const parsedQuote = JSON.parse(savedQuote);
            if (parsedQuote.date === new Date().toDateString()) {
                setQuote(parsedQuote); // Use stored quote if it's from today
            } else {
                fetchQuote(); // Fetch new quote if date has changed
            }
        } else {
            fetchQuote(); // Fetch quote if none exists
        }
    }, []);

    return (
        <div className={styles.quote}>
            <p className={styles.title}>
                Quote of the day
            </p>
            <div className={styles.content}>
                <VscQuote className={styles.icon} />
                <p>Life lived for tomorrow will always be just a day away from being realized.</p>
                <p>Author</p>
                </div>
        </div>

    )
}

export default Quote