import { AppFooter } from "@/components/AppFooter.tsx";
import { AINavigationHeader } from "@/pages/AINavigationPage/components/AINavigationHeader.tsx";

export const AINavigationPage = () => {
  return (
    <div className="min-h-screen">
      <div className="flex-col items-center justify-center">
        <AINavigationHeader />
        <div className="mt-8 text-3xl font-bold text-center text-gray1">Based on your prompt</div>
        <div className="mt-4 text-2xl font-semibold text-center text-transparent text-gray1 bg-gradient-to-r from-appPrimary via-pink-500 to-purple-400 bg-clip-text">
          We will redirect you to the approriate page!
        </div>

        <AppFooter />
      </div>
    </div>
  );
};
