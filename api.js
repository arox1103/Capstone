const mockEvents = [
    { id: 1, title: 'Event 1', description: 'Description for Event 1', date: '2024-04-01', location: 'Location 1' },
    { id: 2, title: 'Event 2', description: 'Description for Event 2', date: '2024-04-02', location: 'Location 2' },
    { id: 3, title: 'Event 3', description: 'Description for Event 3', date: '2024-04-03', location: 'Location 3' }
  ];
  
  export const getAllEvents = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockEvents);
      }, 1000);
    });
  };

  