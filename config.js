// Add Dadi’s real photo to assets/dadi.jpg, or change this relative path.
window.TARA_CONFIG = {
  photo: "assets/dadi.jpg",
  photoPosition: "50% 35%",
  // Add any number of gallery photos. Paths are relative to index.html.
  pictures: [
    // { src: "assets/dadi-with-purvi.jpg", caption: "Dadi and Purvi", alt: "Dadi with her granddaughter Purvi" },
    // { src: "assets/family.jpg", caption: "All of us, together", alt: "Our family together" }
  ],
  // Optional shared leaderboard. Run supabase-setup.sql first.
  // ONLY use the publishable key (or legacy anon key), never a secret/service-role key.
  supabaseUrl: "",
  supabasePublishableKey: ""
};
