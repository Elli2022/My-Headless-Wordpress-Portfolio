// src/pages/contact.tsx
import React from "react";
import Link from "next/link";
import styles from '../app/styles/Contact.module.css'; // Ersätt '../styles/Contact.module.css' med din faktiska sökväg

const ContactPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navLeft}>
        <Link href="/home" className={styles.link}>
          Gå till Portfolio
        </Link>
      </div>

      <div className={styles.card}>
        <h1 className={styles.title}>Contact now</h1>
        <p className="text-center mb-10">
          Have a project or question? Send me a message. I will reply within
          48 hours.
        </p>

        <form className={styles.form}>
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Your name
            </label>
            <input
              type="text"
              id="name"
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor="subject" className="text-sm font-medium">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium">
              Write your message
            </label>
            <textarea
              id="message"
              rows={4}
              className={styles.textarea}
            ></textarea>
          </div>
          <div className={styles.contactInfo}>
            <button
              type="submit"
              className={styles.button}
            >
              Send
            </button>
            <p>
              Email me at{" "}
              <a
                href="mailto:my@gmail.com"
                className={styles.link}
              >
                my@gmail.com
              </a>
            </p>
            <p>
              Call me at{" "}
              <a
                href="tel:+1-402-4983"
                className={styles.link}
              >
                +1-402-4983
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
