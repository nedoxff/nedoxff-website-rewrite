export default function MobileInformationSection() {
  return (
    <div className="xl:hidden overflow-clip rounded-xl p-2 flex flex-col row-span-1 col-span-1 relative">
      <p className="font-body text-xl text-dark dark:text-white">
        this website uses Clash Grotesk and Clash Display fonts, which are
        licensed under the ITF FFL.
        <br />
        the code for this website is open-source and can be found on github.
      </p>
      <p className="font-body text-lg font-light text-dark dark:text-white">
        version {__VERSION_NAME__} • {__LAST_COMMIT_HASH__}
      </p>
    </div>
  );
}
