// GitHub Configuration
// Update this file with your GitHub username and preferences
const GITHUB_CONFIG = {
    // REQUIRED: Replace with your actual GitHub username
    username: 'AntoniyaJency',
    
    // Optional: Repositories to exclude from the display
    excludeRepos: [
        'username.github.io',
        'config' // Exclude this config file repository if it exists
    ],
    
    // Maximum number of repositories to display
    maxRepos: 6,
    
    // Sort options: 'created', 'updated', 'pushed', 'full_name'
    sortBy: 'updated',
    
    // Sort order: 'asc' or 'desc'
    order: 'desc',
    
    // Include forked repositories? (true/false)
    includeForks: false,
    
    // Minimum repository size in KB (filters out very small repos)
    minSizeKB: 1,
    
    // Show archived repositories? (true/false)
    showArchived: false
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GITHUB_CONFIG;
}

// Make available in browser
if (typeof window !== 'undefined') {
    window.GITHUB_CONFIG = GITHUB_CONFIG;
}
