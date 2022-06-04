const percentageOfVotes = (arr, vote) => {
    let totalVotes = 0;
    for (let i = 0; i < arr.length; i++) {
        totalVotes += arr[i].votes;
    }

    if (totalVotes === 0) return 0;

    const percentage = Math.trunc((vote * 100) / totalVotes);
    return percentage;
};

export default percentageOfVotes;
