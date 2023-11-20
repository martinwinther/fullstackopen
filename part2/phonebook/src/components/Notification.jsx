const Notification = ({ message, type }) => {
	if (!message) return null;

	const notificationClass = `notification ${
		type === "success" ? "success" : "error"
	}`;

	return <div className={notificationClass}>{message}</div>;
};

export default Notification;
