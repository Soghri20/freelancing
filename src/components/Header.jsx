import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import logo from "/logo2.png";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignIn, UserButton, useUser } from "@clerk/clerk-react";
import { BriefcaseBusiness, BriefcaseBusinessIcon, PenBox } from "lucide-react";

const Header = () => {
  const [search, setSearch] = useSearchParams();
  const [showSignIn, setShowSignIn] = useState(false);
  const {user}=useUser()

  const openSignIn = () => setSearch({ "sign-in": "true" }); // Set URL param

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };
  return (
    <>
      {/* Navigation Bar */}
      <nav className="py-2 flex justify-between items-center px-6 shadow-md">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Company Logo" className="h-24" />
        </Link>

        {/* Right Section */}
        <div className="flex gap-6 items-center">
          <SignedOut>
            <Button onClick={openSignIn} variant="outline">
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role ==='recruiter' && <Link to="/post-job">
              <Button variant="blue" className="rounded-full flex items-center">
                <PenBox size={20} className="mr-2" />
                Post a Job
              </Button>
            </Link>}
          
            <UserButton
            
              appearance={{
                elements: {
                  avatarBox: "w-13 h-13",
                },
              }}
            >
              <UserButton.MenuItems>
              <UserButton.Link
                label="My jobs"
                labelIcon={<BriefcaseBusinessIcon size={18} />}
                href="/my-jobs"
              />
              </UserButton.MenuItems>
              
            </UserButton>
          
          </SignedIn>
        </div>
      </nav>

      {/* Sign-In Modal */}
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
